import MunicipioTratado from '@modules/municipios/typeorm/entities/MunicipioTratado';
import UfTratado from '@modules/ufs/typeorm/entities/UfTratado';

export default class MunicipioTratadoPessoa {
  municipio: MunicipioTratado | MunicipioTratado[];
  uf: UfTratado | UfTratado[];

  constructor(
    municipio: MunicipioTratado | MunicipioTratado[],
    uf: UfTratado | UfTratado[],
  ) {
    this.municipio = municipio;
    this.uf = uf;
  }
}
