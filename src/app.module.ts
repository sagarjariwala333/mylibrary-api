import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book/book.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [

   ServeStaticModule.forRoot({
      rootPath: join('__dirname'+'/files'),
   }),

  TypeOrmModule.forRoot({
  "type": "mysql",
  "host": "us-east.connect.psdb.cloud",
  "port": 3306,
  "username": "n6ni14g3c2cu0zwxkxm0",
  "password": "pscale_pw_tSQKnkWYu1NXs8p9zZvWK1oKcbR1v0zZjZ4o09jB9kM",
  "database": "book_master",
  "synchronize": false,
  "logging": true,
  "ssl":{"rejectUnauthorized":true},
  "entities": [BookEntity]
  }), BookModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
	constructor()
	{
		console.log(ServeStaticModule.forRoot());
	}
}
