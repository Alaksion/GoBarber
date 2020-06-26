import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class changeAppointmentProviderIDToFK1593197181318
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'providerId');
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'providerId',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'appointment_provider_fk',
        columnNames: ['providerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'appointment_provider_fk');
    await queryRunner.dropColumn('appointments', 'providerId');
    await queryRunner.addColumn(
      'providerId',
      new TableColumn({
        name: 'providerId',
        type: 'varchar',
      }),
    );
  }
}
