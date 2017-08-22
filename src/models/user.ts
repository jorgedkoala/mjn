export class Usuario {
  constructor(
 //   public id: number,
    public uuid: string,
    public password: string,
    public user: string,
    public token: string,
    public alta: Date,
    public ultimoacceso:Date
  ) {}
}
