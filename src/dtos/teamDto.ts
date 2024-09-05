import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTeamNameDto {
  @IsString()
  @IsNotEmpty({ message: 'Team name is required and must be a string.' })
  name!: string;
}
