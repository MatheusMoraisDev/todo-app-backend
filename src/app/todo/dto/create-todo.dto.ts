import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsIn } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  @ApiProperty()
  task: string

  @IsNotEmpty()
  @IsIn([0, 1])
  @ApiPropertyOptional()
  isDone: number
}
