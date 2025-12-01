import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BodyType } from '../enums/body-type.enum';
import { FuelType } from '../enums/fuel-type.enum';
import { TransmissionType } from '../enums/transmission-type.enum';
import { DriveType } from '../enums/drive-type.enum';
import { CarMakeEntity } from '../../car-catalog/entities/car-make.entity';
import { CarModelEntity } from '../../car-catalog/entities/car-model.entity';
import { CarGenerationEntity } from '../../car-catalog/entities/car-generation.entity';
import { CarModificationEntity } from '../../car-catalog/entities/car-modification.entity';

@Entity({ name: 'cars' })
export class CarEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CarMakeEntity)
  make: CarMakeEntity;

  @ManyToOne(() => CarModelEntity)
  model: CarModelEntity;

  @ManyToOne(() => CarGenerationEntity)
  generation: CarGenerationEntity;

  @ManyToOne(() => CarModificationEntity)
  modification: CarModificationEntity;

  @Column({ type: 'enum', enum: BodyType })
  bodyType: BodyType;

  @Column({ type: 'enum', enum: FuelType })
  fuelType: FuelType;

  @Column({ type: 'enum', enum: TransmissionType })
  transmission: TransmissionType;

  @Column({ type: 'enum', enum: DriveType })
  driveType: DriveType;

  @Column()
  year: number;

  @Column()
  mileage: number;

  @Column()
  vin: string;

  @Column({ nullable: true })
  color?: string;
}
