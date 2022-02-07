import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBairros1644263127077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "TB_BAIRRO",
          columns: [
            {
              name: "CODIGO_BAIRRO",
              type: "serial",
              isPrimary: true
            },
            {
              name: "CODIGO_MUNICIPIO",
              type: "integer"
            },
            {
              name: "NOME",
              type: "varchar(256)"
            },
            {
              name: "STATUS",
              type: "integer"
            },
          ],
          foreignKeys: [
            {
              name: "TB_BAIRRO_FK1",
              columnNames: ["CODIGO_MUNICIPIO"],
              referencedTableName: "TB_MUNICIPIO",
              referencedColumnNames: ["CODIGO_MUNICIPIO"]
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("TB_BAIRRO");
    }

}
