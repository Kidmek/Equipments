import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';
import { EquipmentCategory, EquipmentType } from '../entities/equipment.entity';

export class UpdateEquipmentDto {
  @ApiPropertyOptional({ enum: EquipmentCategory })
  @IsEnum(EquipmentCategory)
  @IsOptional()
  category?: EquipmentCategory;

  @ApiPropertyOptional({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  @IsOptional()
  type?: EquipmentType;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({ type: 'array', items: { type: 'string' } })
  @IsOptional()
  @IsArray()
  existingImages?: string[]; // Already saved images (that should remain)

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  @IsOptional()
  images?: Express.Multer.File[]; // New images to be uploaded
}
