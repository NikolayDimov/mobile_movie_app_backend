import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLengthColumnToMovie1742801357257 implements MigrationInterface {
    name = 'AddLengthColumnToMovie1742801357257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "length" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "length" DROP NOT NULL`);
    }

}
