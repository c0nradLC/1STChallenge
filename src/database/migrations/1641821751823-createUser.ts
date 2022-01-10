import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1641821751823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
              {
                name: 'users',
                columns: [
                  {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                  },
                  {
                    name: 'nome',
                    type: 'varchar',
                  },
                  {
                    name: 'telefone',
                    type: 'varchar',
                  },
                  {
                    name: 'cpf',
                    type: 'varchar',
                  },
                  {
                    name: 'cep',
                    type: 'varchar',
                  },
                  {
                    name: 'logradouro',
                    type: 'varchar',
                  },
                  {
                    name: 'cidade',
                    type: 'varchar',
                  },
                  {
                    name: 'estado',
                    type: 'varchar',
                  }
                ],
              },
            ),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
