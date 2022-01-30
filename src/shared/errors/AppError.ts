class AppError {
  public readonly mensagem: string;
  public readonly status: number;

  constructor(mensagem: string, status = 404) {
    this.mensagem = mensagem;
    this.status = status;
  }

}

export default AppError;
