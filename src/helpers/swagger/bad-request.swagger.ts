import { ApiProperty } from '@nestjs/swagger'

export class BadRequestSwagger {
  @ApiProperty()
  statusCode: number

  @ApiProperty()
  error: string

  @ApiProperty()
  message: string[]
}
