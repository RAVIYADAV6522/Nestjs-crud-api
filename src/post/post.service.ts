import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDTO } from './dtos/create-post.dto';
import { ResponsePostDTO } from './dtos/response-post.dto';
import { UpdatePostDTO } from './dtos/update-post.dto';
import { UpdatePostPatchDTO } from './dtos/update-post-patch.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private PostModel: Model<Post>) {}

  async create(data: CreatePostDTO): Promise<ResponsePostDTO> {
    const createdPost = await this.PostModel.create(data);
    const post = await createdPost.save(); // real entity
    console.log(post);
    const postDto = new ResponsePostDTO();
    postDto._id = post._id.toString();
    postDto.title = post.title;
    postDto.description = post.description;

    return postDto;
  }

  async getAll(): Promise<ResponsePostDTO[]> {
    const posts = await this.PostModel.find();
    return posts.map((post) => {
      return {
        _id: post._id.toString(),
        title: post.title,
        description: post.description,
      } as ResponsePostDTO;
    });
  }

  async getOne(id: string) {
    console.log('id', id);
    const post = await this.PostModel.findOne({ _id: id });
    if (!post) {
      throw new NotFoundException(`post with ${id} not found`);
    }
    return post;
  }

  async update(id: string, reqBody: UpdatePostDTO) {
    const post = await this.getOne(id);

    post.title = reqBody.title;
    post.description = reqBody.description;

    return post.save();
  }

  async updateOne(id: string, reqBody: UpdatePostPatchDTO) {
    const post = await this.getOne(id);

    Object.assign(post, reqBody);

    return post.save();
  }

  async deleteOne(id: string) {
    await this.getOne(id); // check
    await this.PostModel.deleteOne({ _id: id });
    return {
      message: 'post deleted',
    };
  }
}

// What happens: Without the @Injectable() decorator, NestJS will not recognize the class as a provider and won't add it to its dependency injection container.

//Consequence: Any attempt to inject PostService into a controller or another service will result in a runtime error like

// private PostModel: Model<Post>----------
// What it does: Declares a private variable PostModel of type Model<Post>.
// The Model<Post> represents the Mongoose model for the Post schema. It provides methods like .find(), .save(), .update(), and more for database operations.
// Why: This variable is used to interact with the MongoDB database. The Model<Post> type ensures type safety and enables the service to perform CRUD operations on Post documents.

//  Post.name----------
// What it does: Refers to the name of the schema defined for the Post model (e.g., 'Post').
// Why: This ensures the correct model is injected. The name must match the name used when defining the schema in MongooseModule (e.g., @Schema() and MongooseModule.forFeature()).
