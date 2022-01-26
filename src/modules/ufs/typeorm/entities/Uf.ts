import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_UF') //nome da tabela no banco
class Uf{
    @PrimaryGeneratedColumn('increment')
    CODIGO_UF: number;

    @Column('varchar2', { length: 3 })
    SIGLA: string;

    @Column('varchar2', { length: 60 })
    NOME: string;

    @Column({ type: 'number', width: 3 }) //"Decorators"
    STATUS: number;
}

export default Uf;
