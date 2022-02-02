import { getCustomRepository } from 'typeorm';
import BairroTratado from '@modules/bairros/typeorm/entities/BairroTratado';
import { BairroRepository } from '@modules/bairros/typeorm/repositories/BairrosRepository';
import MunicipioTratado from '@modules/municipios/typeorm/entities/MunicipioTratado';
import { MunicipioRepository } from '@modules/municipios/typeorm/repositories/MunicipiosRepository';
import UfTratado from '@modules/ufs/typeorm/entities/UfTratado';
import { UfRepository } from '@modules/ufs/typeorm/repositories/UfsRepository';
import EnderecoTratado from '../typeorm/entities/EnderecoTratado';
import { EnderecoRepository } from '../typeorm/repositories/EnderecosRepository';

export default class MontaEnderecoService {
  public async execute( CODIGO_PESSOA: number): Promise<EnderecoTratado | EnderecoTratado[]> {
    const enderecosRepository = getCustomRepository(EnderecoRepository);
    const bairroRepository = getCustomRepository(BairroRepository);
    const municipioRepository = getCustomRepository(MunicipioRepository);
    const ufRepository = getCustomRepository(UfRepository);
    const listaEnderecos = [];


    const enderecos = await enderecosRepository.find({
      where: {
        CODIGO_PESSOA,
      },
    });
    console.log("Monta : ", enderecos);

    if (enderecos.length == 0) {
      return [];
    }

    for (let i = 0; i < enderecos.length; i++){

      const bairro = await bairroRepository.procurarPorCodigo(enderecos[i].CODIGO_BAIRRO);

      if (bairro !== undefined) {

        const municipio = await municipioRepository.procurarPorCodigo(bairro.CODIGO_MUNICIPIO);

        if (municipio !== undefined) {

          const uf = await ufRepository.procurarPorCodigo(municipio.CODIGO_UF);

          if (uf !== undefined) {

            const ufTratado = ufRepository.trataResponse(uf);

            if (ufTratado instanceof UfTratado) {
              const municipioTratado = municipioRepository.trataResponse(municipio, ufTratado);

              if (municipioTratado instanceof MunicipioTratado) {
                const bairroTratado = bairroRepository.trataResponse(bairro, municipioTratado);

                if (bairroTratado instanceof BairroTratado) {
                  const enderecoTratadoPessoa = enderecosRepository.trataResponse(enderecos[i], bairroTratado);

                  if (enderecoTratadoPessoa instanceof EnderecoTratado) {

                    listaEnderecos.push(enderecoTratadoPessoa);

                  }
                }
              }
            }
          }
        }
      }
    }
    return listaEnderecos;
  }
}
