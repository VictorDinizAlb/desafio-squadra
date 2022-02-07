import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMunicipios1644263116776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "TB_MUNICIPIO",
          columns: [
            {
              name: "CODIGO_MUNICIPIO",
              type: "serial",
              isPrimary: true
            },
            {
              name: "CODIGO_UF",
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
              name: "TB_MUNICIPIO_FK1",
              columnNames: ["CODIGO_UF"],
              referencedTableName: "TB_UF",
              referencedColumnNames: ["CODIGO_UF"]
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("TB_MUNICIPIO");
    }

}
