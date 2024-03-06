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

    if (createSkinxDto.forked_from) {
      const skinXFork = await this.skinXRepository.findOne({
        where: { id: createSkinxDto.forked_from },
      });
      if (!skinXFork) throw new BadRequestException('skinx not found');
      skinx.forkedFrom = skinXFork;
    }

    if (createSkinxDto.purchased_from) {
      const skinXPurchased = await this.skinXRepository.findOne({
        where: { id: createSkinxDto.purchased_from },
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

    const forkedCount = await this.countForkedList(id);
    const purchasedList = await this.countPurchasedList(id);

    return { skinx, forkedCount, purchasedList };
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
