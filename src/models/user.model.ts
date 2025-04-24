import { DataTypes, Model, Sequelize } from "sequelize";

export class UserModel extends Model {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
}

export function initUserModel(sequelize: Sequelize) {
    UserModel.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        sequelize,
        tableName: "users",
        timestamps: false,
    });
}
