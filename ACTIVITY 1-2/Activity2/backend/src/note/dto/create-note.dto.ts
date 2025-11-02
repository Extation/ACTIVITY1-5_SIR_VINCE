import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'My First Note', description: 'Title of the note' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of my note...', description: 'Content of the note' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
