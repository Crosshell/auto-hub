import { ObjectType } from '@nestjs/graphql';
import { Listing } from '../entities/listing.entity';
import { Paginated } from '../../../shared/dto/pagination.reponse';

@ObjectType()
export class PaginatedListingsResponse extends Paginated(Listing) {}
