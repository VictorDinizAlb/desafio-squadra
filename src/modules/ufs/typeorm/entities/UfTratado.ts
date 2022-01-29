class UfTratado {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;

  constructor(codigoUF: number, sigla: string, nome: string, status: number) {
    this.codigoUF = codigoUF;
    this.sigla = sigla;
    this.nome = nome;
    this.status = status;
  }
}

export default UfTratado;
