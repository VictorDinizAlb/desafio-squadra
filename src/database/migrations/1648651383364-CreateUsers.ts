import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1648649181317 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "TB_USERS",
          columns: [
            {
              name: "CODIGO_USER",
              type: "serial",
              isPrimary: true
            },
            {
              name: "NOME",
              type: "varchar"
            },
            {
              name: "EMAIL",
              type: "varchar",
              isUnique: true
            },
            {
              name: "PASSWORD",
              type: "varchar"
            },
            {
              name: "AVATAR",
              type: "varchar"
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('TB_USERS');
    }

}
