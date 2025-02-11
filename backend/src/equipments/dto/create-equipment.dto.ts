import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EquipmentCategory, EquipmentType } from '../entities/equipment.entity';

export class CreateEquipmentDto {
  @ApiProperty({ enum: EquipmentCategory })
  @IsEnum(EquipmentCategory)
  category: EquipmentCategory;

  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  type: EquipmentType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  @IsOptional()
  images?: Express.Multer.File[]; // New images to be uploaded
}
