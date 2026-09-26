export class CreateJenisUsahaDto {
  code: string;
  name: string;
  description?: string;
  icon?: string;
}

export class UpdateJenisUsahaDto {
  code?: string;
  name?: string;
  description?: string;
  icon?: string;
}
