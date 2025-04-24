import { Model, Sequelize, DataTypes } from "sequelize";

export class ProductModel extends Model {
    declare id: string;
    declare name: string;
    declare price: number;
    declare quantity: number;
}

export function initProductModel(sequelize: Sequelize) {
    ProductModel.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        price: DataTypes.FLOAT,
        quantity: DataTypes.INTEGER,
    }, {
        sequelize,
        tableName: "products",
        timestamps: false,
    });
}
