import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePessoas1644263145532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "TB_PESSOA",
          columns: [
            {
              name: "CODIGO_PESSOA",
              type: "serial",
              isPrimary: true
            },
            {
              name: "NOME",
              type: "varchar(256)"
            },
            {
              name: "SOBRENOME",
              type: "varchar(256)"
            },
            {
              name: "IDADE",
              type: "integer"
            },
            {
              name: "LOGIN",
              type: "varchar(50)"
            },
            {
              name: "SENHA",
              type: "varchar(50)"
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
      await queryRunner.dropTable("TB_PESSOA");
    }

}
