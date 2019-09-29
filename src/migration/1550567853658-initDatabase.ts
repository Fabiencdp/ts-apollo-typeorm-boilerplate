import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDatabase1550567853658 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.query(`
      CREATE TABLE "users" (
                             "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                             "email" character varying(250) NOT NULL,
                             "password" character varying(250) NOT NULL,
                             "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
                             "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
                             UNIQUE ("email"),
                             PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.query(`
      DROP TABLE users;
    `);
  }

}
