import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { TodoService } from './todo.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TodoQueryDto } from './dto/todo-query.dto'
import { IndexTodoSwagger } from './swagger/index-todo-swagger'
import { CreateTodoSwagger } from './swagger/create-todo-swagger'
import { ShowTodoSwagger } from './swagger/show-todo-swagger'
import { UpdateTodoSwagger } from './swagger/update-todo-swagger'
import { BadRequestSwagger } from '../../helpers/swagger/bad-request.swagger'
import { NotFoundSwagger } from '../../helpers/swagger/not-found.swagger'

@Controller('api/v1/todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas.' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas.',
    type: [IndexTodoSwagger],
  })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.', type: [BadRequestSwagger] })
  @ApiResponse({ status: 404, description: 'Tarefas não encontradas.', type: [NotFoundSwagger] })
  async index(@Query() query: TodoQueryDto) {
    return await this.todoService.findAll()
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa.' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.', type: [BadRequestSwagger] })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso.',
    type: [CreateTodoSwagger],
  })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mostra uma tarefa especificada.' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa encontrada.',
    type: [ShowTodoSwagger],
  })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.', type: [NotFoundSwagger] })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOneOrFail(id)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma tarefa especificada.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.', type: [NotFoundSwagger] })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.', type: [BadRequestSwagger] })
  @ApiResponse({
    status: 200,
    description: 'Tarefa atualizada com sucesso.',
    type: [UpdateTodoSwagger],
  })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateTodoDto) {
    return await this.todoService.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma tarefa especificada.' })
  @ApiResponse({ status: 400, description: 'Parâmetros inválidos.', type: [BadRequestSwagger] })
  @ApiResponse({ status: 204, description: 'Tarefa deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.', type: [NotFoundSwagger] })
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.deleteById(id)
  }
}
