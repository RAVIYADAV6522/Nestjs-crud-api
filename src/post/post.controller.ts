import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';

import { CreatePostDTO } from './dtos/create-post.dto';
import { UpdatePostDTO } from './dtos/update-post.dto';
import { UpdatePostPatchDTO } from './dtos/update-post-patch.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  Create(@Body() reqBody: CreatePostDTO) {
    // console.log(reqBody);
    return this.postService.create(reqBody);
  }

  @Get()
  getAllData() {
    return this.postService.getAll();
  }

  @Get('/:id')
  getData(@Param('id') id: string) {
    return this.postService.getOne(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() reqBody: UpdatePostDTO) {
    return this.postService.update(id, reqBody);
  }

  @Patch('/:id')
  updateOne(@Param('id') id: string, @Body() reqBody: UpdatePostPatchDTO) {
    return this.postService.updateOne(id, reqBody);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.postService.deleteOne(id);
  }
}
