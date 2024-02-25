import { Injectable, NotFoundException } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  
  async findAll() {
    return await this.todoRepository.find();
  }

  async findOneOrFail(id: string){
    try {
      return await this.todoRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Todo com id ${id} não encontrado.`);
    }
  }

  async deleteById(id: string) {
    await this.findOneOrFail(id);
    await this.todoRepository.softDelete(id);
  }

  async create(data: CreateTodoDto) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data: UpdateTodoDto) {
    const todo = await this.findOneOrFail(id);

    this.todoRepository.merge(todo, data);
    return this.todoRepository.save(todo);
  }

}
