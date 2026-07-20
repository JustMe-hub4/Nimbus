import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddAuditLogs1700000000007 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
