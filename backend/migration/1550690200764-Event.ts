import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Event1550690200764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.createTable(new Table({
        name: 'event',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '400',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'img',
            type: 'varchar',
            length: '1000',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('event');
    }

}
