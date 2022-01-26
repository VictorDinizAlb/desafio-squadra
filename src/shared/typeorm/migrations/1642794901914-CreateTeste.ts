import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTeste1642794901914 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'Teste',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'teste',
          type: 'varchar',
        },
      ]
    }));
  }


  public async down(queryRunner: QueryRunner): Promise < void> {
    await queryRunner.dropTable('teste');
  }

}
