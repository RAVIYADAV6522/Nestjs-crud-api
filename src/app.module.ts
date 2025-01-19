import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test.controller';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot(
      'mongodb+srv://yadavr74839:qwert5yuiop@postcluster.amie1.mongodb.net/post_db?retryWrites=true&w=majority&appName=PostCluster',
    ),
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
