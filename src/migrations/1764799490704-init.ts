import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764799490704 implements MigrationInterface {
    name = 'Init1764799490704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_models" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "makeId" uuid NOT NULL, CONSTRAINT "PK_ee4355345e0e1c18cb6efa2bd5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "car_makes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "UQ_03e3bbc223f0c5809fe385f846b" UNIQUE ("name"), CONSTRAINT "PK_dc5d7e34799a27e68f5fdc7f910" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cars_bodytype_enum" AS ENUM('BUGGY', 'CABRIOLET', 'COUPE', 'FASTBACK', 'HATCHBACK', 'SEDAN', 'LIMOUSINE', 'VAN', 'SUV', 'PICKUP')`);
        await queryRunner.query(`CREATE TYPE "public"."cars_drivetype_enum" AS ENUM('FWD', 'RWD', 'AWD', '4WD')`);
        await queryRunner.query(`CREATE TYPE "public"."cars_transmission_enum" AS ENUM('MANUAL', 'AUTOMATIC', 'CVT', 'DSG')`);
        await queryRunner.query(`CREATE TYPE "public"."cars_fueltype_enum" AS ENUM('PETROL', 'DIESEL', 'HYBRID', 'ELECTRIC', 'GASOLINE')`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "makeId" uuid NOT NULL, "modelId" uuid NOT NULL, "mileage" integer NOT NULL, "vin" character varying NOT NULL, "engineVolume" numeric(5,2), "modification" character varying, "year" integer NOT NULL, "bodyType" "public"."cars_bodytype_enum" NOT NULL, "seats" integer, "doors" integer, "color" character varying, "driveType" "public"."cars_drivetype_enum" NOT NULL, "transmission" "public"."cars_transmission_enum" NOT NULL, "fuelType" "public"."cars_fueltype_enum" NOT NULL, "horsePower" integer, "fuelConsumption" numeric(5,2), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listing_photos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "listingId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_73c5fd7f964a698b78f0920917c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "listings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ownerId" uuid NOT NULL, "carId" uuid NOT NULL, "title" character varying NOT NULL, "description" text, "price" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'ACTIVE', "location" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_e424dc464054047c93e56fc5e2" UNIQUE ("carId"), CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorites" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "listingId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c472a19a7423cfbbf6b7c75939" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "phone" character varying, "isEmailVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "car_models" ADD CONSTRAINT "FK_ff72b51a51d29375803946367fb" FOREIGN KEY ("makeId") REFERENCES "car_makes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_642f9276e31cb67bd99041dcf0c" FOREIGN KEY ("makeId") REFERENCES "car_makes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_415edcdb4b9eaeb5dd6ee266590" FOREIGN KEY ("modelId") REFERENCES "car_models"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "listing_photos" ADD CONSTRAINT "FK_fbe5bfb140ed07ab1bc04bd92c5" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_e424dc464054047c93e56fc5e20" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_1dd5c393ad0517be3c31a7af836" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favorites" ADD CONSTRAINT "FK_9a8d1df0a7b4195870a779070bd" FOREIGN KEY ("listingId") REFERENCES "listings"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_9a8d1df0a7b4195870a779070bd"`);
        await queryRunner.query(`ALTER TABLE "user_favorites" DROP CONSTRAINT "FK_1dd5c393ad0517be3c31a7af836"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_e424dc464054047c93e56fc5e20"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9"`);
        await queryRunner.query(`ALTER TABLE "listing_photos" DROP CONSTRAINT "FK_fbe5bfb140ed07ab1bc04bd92c5"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_415edcdb4b9eaeb5dd6ee266590"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_642f9276e31cb67bd99041dcf0c"`);
        await queryRunner.query(`ALTER TABLE "car_models" DROP CONSTRAINT "FK_ff72b51a51d29375803946367fb"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_favorites"`);
        await queryRunner.query(`DROP TABLE "listings"`);
        await queryRunner.query(`DROP TABLE "listing_photos"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TYPE "public"."cars_fueltype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cars_transmission_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cars_drivetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."cars_bodytype_enum"`);
        await queryRunner.query(`DROP TABLE "car_makes"`);
        await queryRunner.query(`DROP TABLE "car_models"`);
    }

}
