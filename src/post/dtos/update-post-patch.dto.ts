import { CreatePostDTO } from './create-post.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePostPatchDTO extends PartialType(CreatePostDTO) {}
