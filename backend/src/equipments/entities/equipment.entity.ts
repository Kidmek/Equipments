import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EquipmentCategory {
  EARTHMOVING = 'EARTHMOVING_EQUIPMENT',
  CONSTRUCTION_VEHICLES = 'CONSTRUCTION_VEHICLES',
  MATERIAL_HANDLING = 'MATERIAL_HANDLING',
  CONCRETE_EQUIPMENT = 'CONCRETE_EQUIPMENT',
  COMPACTION_EQUIPMENT = 'COMPACTION_EQUIPMENT',
  PAVING_EQUIPMENT = 'PAVING_EQUIPMENT',
}

export enum EquipmentType {
  // Earthmoving Equipment
  EXCAVATOR = 'EXCAVATOR',
  BULLDOZER = 'BULLDOZER',
  LOADER = 'LOADER',
  BACKHOE = 'BACKHOE',
  GRADER = 'GRADER',

  // Construction Vehicles
  DUMP_TRUCK = 'DUMP_TRUCK',
  WATER_TRUCK = 'WATER_TRUCK',
  CONCRETE_MIXER_TRUCK = 'CONCRETE_MIXER_TRUCK',

  // Material Handling
  FORKLIFT = 'FORKLIFT',
  TELEHANDLER = 'TELEHANDLER',
  CRANE = 'CRANE',
  HOIST = 'HOIST',

  // Concrete Equipment
  CONCRETE_MIXER = 'CONCRETE_MIXER',
  CONCRETE_PUMP = 'CONCRETE_PUMP',
  CONCRETE_VIBRATOR = 'CONCRETE_VIBRATOR',

  // Compaction Equipment
  ROLLER = 'ROLLER',
  PLATE_COMPACTOR = 'PLATE_COMPACTOR',
  RAMMER = 'RAMMER',

  // Paving Equipment
  ASPHALT_PAVER = 'ASPHALT_PAVER',
  ROAD_ROLLER = 'ROAD_ROLLER',
  CHIP_SPREADER = 'CHIP_SPREADER',
}

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EquipmentCategory,
  })
  category: EquipmentCategory;

  @Column({
    type: 'enum',
    enum: EquipmentType,
  })
  type: EquipmentType;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  quantity: number;

  @Column('text', { array: true })
  images: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
