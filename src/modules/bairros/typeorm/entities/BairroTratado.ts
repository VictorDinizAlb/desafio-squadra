import MunicipioTratado from "@modules/municipios/typeorm/entities/MunicipioTratado";

class BairroTratado {
  codigoBairro: number;
  codigoMunicipio: number;
  nome: string;
  status: number;
  municipio?: MunicipioTratado

  constructor(
    codigoBairro: number,
    codigoMunicipio: number,
    nome: string,
    status: number,
    municipio?: MunicipioTratado
  ) {
    this.codigoBairro = codigoBairro;
    this.codigoMunicipio = codigoMunicipio;
    this.nome = nome;
    this.status = status;
    this.municipio = municipio;
  }
}

export default BairroTratado;
