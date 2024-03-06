import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkinxService } from './skinx.service';
import { CreateSkinxDTO, UpdateSkinxDTO } from './skinx.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('skinx')
@ApiTags('SkinX')
export class SkinxController {
  constructor(private readonly skinxService: SkinxService) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  create(@Body() createSkinxDto: CreateSkinxDTO) {
    return this.skinxService.create(createSkinxDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  findAll() {
    return this.skinxService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one' })
  findOne(@Param('id') id: number) {
    return this.skinxService.findOne(id);
  }
}
