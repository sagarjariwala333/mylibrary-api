import { 
	Controller,
	Get,
	Post,
	Body,
	UseInterceptors,
	UploadedFile,
	HttpStatus,
	Param 
} 
	from '@nestjs/common';

import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookDTO } from './book.dto';
import { BookIdDTO } from './bookId.dto';
import { BookService } from './book.service';
import { diskStorage } from 'multer';

@Controller('book')
export class BookController {
	constructor(private bookService:BookService)
	{

	}

	@Get()
	async showAllBooks()
	{
		console.log(__dirname+" Hello");
		let books = await this.bookService.showAll();
		return books;
	}

	@Post('getBookDetails')
	async getBookDetails(@Body() data:BookIdDTO)
	{
		console.log(data);
		let id=data.id;
		let book = await this.bookService.read(id);
		return book;
	}

	@Post('insertBook')
	async insertBook(@Body() data:BookDTO)
	{
		let book = await this.bookService.create(data);
		return book;
	}

	@Post('uploadBook')
	@UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: __dirname+"/files",
        filename: (req,file,cb)=>{
        	let name=file.originalname.split('.')[0];
        	let fileExtension=file.originalname.split('.')[1];
        	let newFilename=name.split(" ").join('_')+'_'+Date.now()+'.'+fileExtension;

        	cb(null,newFilename);
        }
      }),
    }),
  )
	async uploadBook(@UploadedFile() file:Express.Multer.File)
	{
		//data.location=file.filename;
		//let book = await this.bookService.create(data);
		return file;
		//console.log(file);
	}
}
