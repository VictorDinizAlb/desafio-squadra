import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_MUNICIPIO')
class Municipio{
    @PrimaryGeneratedColumn('increment')
    CODIGO_MUNICIPIO: number;

    @Column({ type: 'int', width: 9 })
    CODIGO_UF: number;

    @Column('varchar', { length: 256 })
    NOME: string;

    @Column({ type: 'int', width: 3 })
    STATUS: number;
}

export default Municipio;
