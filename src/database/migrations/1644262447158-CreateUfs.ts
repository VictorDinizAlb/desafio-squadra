import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUfs1644262447158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "TB_UF",
          columns: [
            {
              name: "CODIGO_UF",
              type: "serial",
              isPrimary: true
            },
            {
              name: "SIGLA",
              type: "varchar(3)",
              isUnique: true
            },
            {
              name: "NOME",
              type: "varchar(60)"
            },
            {
              name: "STATUS",
              type: "integer"
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("TB_UF");
    }

}
