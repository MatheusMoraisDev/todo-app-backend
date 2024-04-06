import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { executionAsyncId } from 'async_hooks'; // Assumindo que essa importação é necessária
import { TodoEntity } from './entity/todo.entity';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({id: '1', task: 'Tarefa 1', isDone: 0}),
  new TodoEntity({id: '2', task: 'Tarefa 2', isDone: 0}),
  new TodoEntity({id: '3', task: 'Tarefa 3', isDone: 0}),
];

describe('ControladorDeTarefas', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            create: jest.fn(),
            findOneOrFail: jest.fn(),
            deleteById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('deve ser definido', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  // Adicione mais casos de teste aqui ...

  describe('index', () => {
    it('deve chamar o método findAll', async () => {
      // Arrange

      // Act
      const result = await todoController.index({});

      // Assert
      expect(result).toEqual(todoEntityList);
      expect(typeof result).toBe('object');
      expect(result[0].id).toEqual(todoEntityList[0].id);
    });
  });
});
