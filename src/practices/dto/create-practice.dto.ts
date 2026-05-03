import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePracticeDto {
  @IsString()
  @IsNotEmpty()
  nomeUsuario: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsISO8601()
  @IsNotEmpty()
  data: string; // YYYY-MM-DD

  @IsOptional()
  @IsString()
  descricao?: string;
}
