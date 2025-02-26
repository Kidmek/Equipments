import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentsService } from './equipments.service';
import { ApiConsumes } from '@nestjs/swagger';
import { FileUploadInterceptor } from 'src/common/interceptors/file.interceptor';
import { FindEquipmentDto } from './dto/find-equipment.dto';
@Controller('equipment')
export class EquipmentsController {
  constructor(private readonly equipmentService: EquipmentsService) {}

  @Post()
  @ApiConsumes('multipart/form-data') // Tells Swagger this will handle multipart form data
  @UseInterceptors(FileUploadInterceptor)
  async create(
    @Body(new ValidationPipe({ transform: true }))
    createEquipmentDto: CreateEquipmentDto, // Handle other form data
    @UploadedFiles() files: Express.Multer.File[], // Handle the uploaded files
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one image must be provided.');
    }
    const imageUrls = files.map((file) => file.filename); // Store the file paths in the imageUrls array
    return this.equipmentService.create(createEquipmentDto, imageUrls);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data') // Tells Swagger this will handle multipart form data
  @UseInterceptors(FileUploadInterceptor)
  async update(
    @Param('id') id: number,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
    @UploadedFiles() files: Express.Multer.File[], // Handle the uploaded files
  ) {
    return this.equipmentService.update(id, updateEquipmentDto, files);
  }

  // Get all equipment with optional search, filter, sort, and pagination
  @Get()
  findAll(@Query() query: FindEquipmentDto) {
    return this.equipmentService.findAll(
      query.search,
      query.category,
      query.type,
      query.sortBy,
      query.sortOrder,
      Number(query.page) || 1, // Ensure default values are applied
      Number(query.limit) || 10,
      Number(query.minPrice) || undefined,
      Number(query.maxPrice) || undefined,
      Number(query.minQuantity) || undefined,
      Number(query.maxQuantity) || undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.equipmentService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.equipmentService.remove(id);
  }
}
