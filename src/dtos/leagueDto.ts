import { IsString, IsNotEmpty } from 'class-validator';

export class CreateLeagueDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  adminId: string;

  constructor(
    id: string,
    name: string,
    type: string,
    adminId: string,
    description?: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.adminId = adminId;
    this.description = description;
  }
}
