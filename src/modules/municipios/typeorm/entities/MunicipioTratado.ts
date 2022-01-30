import UfTratado from "@modules/ufs/typeorm/entities/UfTratado";

class MunicipioTratado {
  codigoMunicipio: number;
  codigoUF: number;
  nome: string;
  status: number;
  uf?: UfTratado

  constructor(
    codigoMunicipio: number,
    codigoUF: number,
    nome: string,
    status: number,
    uf?: UfTratado
  ) {
    this.codigoMunicipio = codigoMunicipio;
    this.codigoUF = codigoUF;
    this.nome = nome;
    this.status = status;
    this.uf = uf;
  }
}

export default MunicipioTratado;
