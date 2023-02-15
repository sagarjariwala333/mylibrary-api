import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity'
import { BookDTO } from './book.dto'

@Injectable()
export class BookService {

	constructor(
		@InjectRepository(BookEntity)
		private bookRepository: Repository<BookEntity>,
		){}

	async showAll()
	{
		return await this.bookRepository.find();
	}

	async create(data:BookDTO)
	{
		let book = this.bookRepository.create(data);
		await this.bookRepository.save(data);
		return book;
	}


	async read(id: number) 
	{
        return await this.bookRepository.findOne({ where: { id: id } });
    }

}
