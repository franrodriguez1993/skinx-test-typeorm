import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSkinxDTO, UpdateSkinxDTO } from './skinx.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SkinXEntity } from 'src/app/database/entities/skinx.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class SkinxService {
  private userService: UserService;
  constructor(
    @InjectRepository(SkinXEntity)
    private skinXRepository: Repository<SkinXEntity>,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.userService = this.moduleRef.get(UserService, { strict: false });
  }

  async create(createSkinxDto: CreateSkinxDTO) {
    //find user:
    const user = await this.userService.getUserById(createSkinxDto.user_id);

    const skinx = this.skinXRepository.create({ data: createSkinxDto.data });
    skinx.user = user;

    if (createSkinxDto.forkedFrom) {
      const skinXFork = await this.skinXRepository.findOne({
        where: { id: createSkinxDto.forkedFrom },
      });
      if (!skinXFork) throw new BadRequestException('skinx not found');
      skinx.forkedFrom = skinXFork;
    }

    if (createSkinxDto.purchasedFrom) {
      const skinXPurchased = await this.skinXRepository.findOne({
        where: { id: createSkinxDto.purchasedFrom },
      });
      if (!skinXPurchased) throw new BadRequestException('skinx not found');
      skinx.purchasedFrom = skinXPurchased;
    }
    return await this.skinXRepository.save(skinx);
  }

  findAll() {
    return `This action returns all skinx`;
  }

  async findOne(id: number) {
    const skinx = await this.skinXRepository.findOne({
      where: { id },
      relations: ['purchasedFrom', 'forkedFrom'],
    });

    const forked = await this.countForkedList(id);
    const purchased = await this.countPurchasedList(id);

    return { skinx, forked, purchased };
  }

  async countForkedList(skinXId: number): Promise<number> {
    return this.skinXRepository
      .createQueryBuilder('skinx')
      .where('skinx.forkedFrom = :id', { id: skinXId })
      .getCount();
  }

  async countPurchasedList(skinXId: number): Promise<number> {
    return this.skinXRepository
      .createQueryBuilder('skinx')
      .where('skinx.purchasedFrom = :id', { id: skinXId })
      .getCount();
  }
}
