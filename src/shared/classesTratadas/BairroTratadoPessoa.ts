import BairroTratado from "@modules/bairros/typeorm/entities/BairroTratado";
import MunicipioTratadoPessoa from "./MunicipioTratadoPessoa";

export default class BairroTratadoPessoa {
  bairro: BairroTratado | BairroTratado[];
  municipio: MunicipioTratadoPessoa;

  constructor(
    bairro: BairroTratado | BairroTratado[],
    municipio: MunicipioTratadoPessoa
  ) {
    this.bairro = bairro;
    this.municipio = municipio;
  }
}
