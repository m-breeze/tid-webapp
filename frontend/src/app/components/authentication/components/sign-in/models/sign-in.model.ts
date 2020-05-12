export class SignIn {

  public password: string;
  public username: string;
  public token?: string;

  constructor(init?: Partial<SignIn>) {
    Object.assign(this, init);
  }
}
