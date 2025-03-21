import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMovieDbMigration1705909999999 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if 'user' table already exists
        const tableExists = await queryRunner.hasTable("user");

        if (!tableExists) {
            // User table
            await queryRunner.createTable(
                new Table({
                    name: "user",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "uuid",
                        },
                        {
                            name: "email",
                            type: "varchar",
                            length: "120",
                            isUnique: true,
                            isNullable: false,
                        },
                        {
                            name: "password",
                            type: "varchar",
                            isNullable: false,
                        },
                        {
                            name: "created_at",
                            type: "timestamp",
                            default: "now()",
                        },
                        {
                            name: "updated_at",
                            type: "timestamp",
                            default: "now()",
                        },
                    ],
                })
            );
        }

        // Genre table
        await queryRunner.createTable(
            new Table({
                name: "genre",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        );

        // Movie table
        await queryRunner.createTable(
            new Table({
                name: "movie",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "title",
                        type: "varchar",
                        length: "150",
                        isNullable: false,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "release_date",
                        type: "date",
                        isNullable: true,
                    },
                    {
                        name: "genre_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "user_id",
                        type: "uuid", // New column for user_id
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["genre_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "genre",
                        onDelete: "CASCADE",
                    }),
                    new TableForeignKey({
                        columnNames: ["user_id"], // Foreign key for user_id
                        referencedColumnNames: ["id"],
                        referencedTableName: "user",
                        onDelete: "CASCADE",
                    }),
                ],
            })
        );

        // Review table
        await queryRunner.createTable(
            new Table({
                name: "review",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "rating",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "comment",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "movie_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    new TableForeignKey({
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "user",
                        onDelete: "CASCADE",
                    }),
                    new TableForeignKey({
                        columnNames: ["movie_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "movie",
                        onDelete: "CASCADE",
                    }),
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("review");
        await queryRunner.dropTable("movie");
        await queryRunner.dropTable("genre");
        await queryRunner.dropTable("user");
    }
}
