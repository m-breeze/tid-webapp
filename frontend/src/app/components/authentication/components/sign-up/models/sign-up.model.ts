export class SignUp {

  public email: string;
  public password: string;
  public username: string;

  constructor(init?: Partial<SignUp>) {
    Object.assign(this, init);
  }
}
