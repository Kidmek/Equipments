/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EquipmentCategory, EquipmentType } from '../entities/equipment.entity';
import { Transform } from 'class-transformer';

export enum EquipmentSortFields {
  ID = 'id',
  CATEGORY = 'category',
  TYPE = 'type',
  PRICE = 'price',
  QUANTITY = 'quantity',
  CREATED_AT = 'createdAt',
}
export class FindEquipmentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ enum: EquipmentCategory, required: false })
  @IsOptional()
  @IsEnum(EquipmentCategory)
  category?: EquipmentCategory;

  @ApiProperty({ enum: EquipmentType, required: false })
  @IsOptional()
  @IsEnum(EquipmentType)
  type?: EquipmentType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Convert to number
  minPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Convert to number
  maxPrice?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Convert to number
  minQuantity?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Convert to number
  maxQuantity?: number;

  @ApiProperty({
    enum: EquipmentSortFields,
    required: false,
    default: EquipmentSortFields.ID,
  })
  @IsOptional()
  @IsEnum(EquipmentSortFields)
  sortBy?: EquipmentSortFields = EquipmentSortFields.ID;

  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], default: 'ASC' })
  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Convert to number
  page?: number = 1;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value)) // Convert to number
  limit?: number = 10;
}
