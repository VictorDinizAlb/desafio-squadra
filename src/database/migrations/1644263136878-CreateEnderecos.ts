import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnderecos1644263136878 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "TB_ENDERECO",
          columns: [
            {
              name: "CODIGO_ENDERECO",
              type: "serial",
              isPrimary: true
            },
            {
              name: "CODIGO_PESSOA",
              type: "integer"
            },
            {
              name: "CODIGO_BAIRRO",
              type: "integer"
            },
            {
              name: "NOME_RUA",
              type: "varchar(256)"
            },
            {
              name: "NUMERO",
              type: "varchar(10)"
            },
            {
              name: "COMPLEMENTO",
              type: "varchar(20)"
            },
            {
              name: "CEP",
              type: "VARCHAR(10)"
            },
          ],
          foreignKeys: [
            {
              name: "TB_ENDERECO_FK1",
              columnNames: ["CODIGO_PESSOA"],
              referencedTableName: "TB_PESSOA",
              referencedColumnNames: ["CODIGO_PESSOA"]
            },
            {
              name: "TB_ENDERECO_FK2",
              columnNames: ["CODIGO_BAIRRO"],
              referencedTableName: "TB_BAIRRO",
              referencedColumnNames: ["CODIGO_BAIRRO"]
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("TB_ENDERECO");
    }

}
