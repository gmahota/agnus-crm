"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser1608395264708 = void 0;
const typeorm_1 = require("typeorm");
class createUser1608395264708 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar(20)',
                    isPrimary: true
                },
                {
                    name: 'username',
                    type: 'varchar(50)'
                },
                {
                    name: 'name',
                    type: 'varchar(50)'
                },
                {
                    name: 'firstName',
                    type: 'varchar(50)',
                    isNullable: true
                },
                {
                    name: 'lastName',
                    type: 'varchar(50)',
                    isNullable: true
                },
                {
                    name: 'phoneNumber',
                    type: 'varchar(20)',
                    isNullable: true
                },
                {
                    name: 'email',
                    type: 'varchar(50)',
                    isNullable: true
                },
                {
                    name: 'password',
                    type: 'varchar(50)'
                },
                {
                    name: 'confirmPassword',
                    type: 'bit'
                },
                {
                    name: 'inactive',
                    type: 'bit'
                },
                {
                    name: 'country',
                    type: 'varchar(10)',
                    isNullable: true
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("users");
    }
}
exports.createUser1608395264708 = createUser1608395264708;
