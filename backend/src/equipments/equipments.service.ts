import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Equipment,
  EquipmentCategory,
  EquipmentType,
} from './entities/equipment.entity';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { deleteImages } from 'src/common/utils/file.utils';
@Injectable()
export class EquipmentsService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  async create(
    data: CreateEquipmentDto,
    imageUrls: string[],
  ): Promise<Equipment> {
    const equipment = this.equipmentRepository.create({
      ...data,
      images: imageUrls,
    });
    return this.equipmentRepository.save(equipment);
  }

  async update(
    id: number,
    data: UpdateEquipmentDto,
    files: Express.Multer.File[],
  ): Promise<Equipment> {
    const equipment = await this.findOne(id);

    // Get the existing images from the database
    const savedImages = equipment.images || [];

    // Get the images the user wants to keep
    const imagesToKeep = data.existingImages || [];

    // Find images that should be deleted
    const imagesToDelete = savedImages.filter(
      (image) => !imagesToKeep.includes(image),
    );

    if (imagesToDelete.length > 0) {
      deleteImages(imagesToDelete);
    }

    // Save new image names
    const newImages = files.map((file) => file.filename);

    // Update the database with the final image list (existing + new)
    equipment.images = [...imagesToKeep, ...newImages];

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ''),
    );

    // Update other fields if they are provided
    Object.assign(equipment, filteredData);

    return this.equipmentRepository.save(equipment);
  }

  async findAll(
    search?: string,
    category?: EquipmentCategory,
    type?: EquipmentType,
    sortBy: keyof Equipment = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    page = 1,
    limit = 10,
    minPrice?: number,
    maxPrice?: number,
    minQuantity?: number,
    maxQuantity?: number,
  ): Promise<{
    data: Equipment[];
    total: number;
    page: number;
    limit: number;
  }> {
    const query = this.equipmentRepository.createQueryBuilder('equipment');

    // Search filter
    if (search) {
      query.andWhere('equipment.description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    // Category and type filter
    if (category && type) {
      query.andWhere(
        'equipment.category = :category AND equipment.type = :type',
        { category, type },
      );
    } else if (category) {
      query.andWhere('equipment.category = :category', { category });
    }

    // Price filtering
    if (minPrice !== undefined) {
      query.andWhere('equipment.price >= :minPrice', { minPrice });
    }
    if (maxPrice !== undefined) {
      query.andWhere('equipment.price <= :maxPrice', { maxPrice });
    }

    // Quantity filtering
    if (minQuantity !== undefined) {
      query.andWhere('equipment.quantity >= :minQuantity', { minQuantity });
    }
    if (maxQuantity !== undefined) {
      query.andWhere('equipment.quantity <= :maxQuantity', { maxQuantity });
    }

    // Sorting
    query.orderBy(`equipment.${sortBy}`, sortOrder);

    // Pagination
    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }

  async remove(id: number): Promise<void> {
    const found = await this.findOne(id);
    if (found.images.length > 0) {
      deleteImages(found.images);
    }
    await this.equipmentRepository.delete(id);
  }

  async findOne(id: number): Promise<Equipment> {
    const found = await this.equipmentRepository.findOne({ where: { id } });
    if (!found) {
      throw new BadRequestException('Equipment not found');
    }
    return found;
  }
}
