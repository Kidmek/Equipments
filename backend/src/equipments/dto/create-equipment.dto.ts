import { IsEnum, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EquipmentCategory, EquipmentType } from '../entities/equipment.entity';
import { Transform, TransformFnParams } from 'class-transformer'; // Import the Transform decorator

export class CreateEquipmentDto {
  @ApiProperty({ enum: EquipmentCategory })
  @IsEnum(EquipmentCategory)
  @IsNotEmpty()
  category: EquipmentCategory;

  @ApiProperty({ enum: EquipmentType })
  @IsEnum(EquipmentType)
  @IsNotEmpty()
  type: EquipmentType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }: TransformFnParams) => {
    const parsed = parseFloat(value as string);
    return isNaN(parsed) ? 0 : parsed; // Fallback to 0 if parsing fails
  })
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Transform(({ value }: TransformFnParams) => {
    const parsed = parseInt(value as string);
    return isNaN(parsed) ? 0 : parsed; // Fallback to 0 if parsing fails
  })
  quantity: number;

  @ApiPropertyOptional({
    type: 'array',
    items: { type: 'string', format: 'binary' },
  })
  images?: Express.Multer.File[]; // New images to be uploaded
}
