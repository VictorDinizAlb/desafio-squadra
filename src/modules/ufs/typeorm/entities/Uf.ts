import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TB_UF') //nomde da tabela no banco
class Uf{
    @PrimaryGeneratedColumn("increment")
    CODIGO_UF!: number;

    @Column("varchar", { length: 3 })
    SIGLA!: string;

    @Column("varchar", { length: 60 })
    NOME!: string;

    @Column({ type: "int", width: 3 }) //"Decorators"
    STATUS!: number;
}

export default Uf;
