export default class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(stat: number, msg: string) {
    super(msg);
    this.status = stat;
    this.message = msg;
  }
}