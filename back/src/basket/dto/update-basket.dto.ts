import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateBasketDto } from './create-basket.dto';


export class UpdateBasketDto extends PartialType(OmitType(CreateBasketDto, ['productId'])) {}
