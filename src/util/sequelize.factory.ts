import { Sequelize } from "sequelize";
import { initProductModel } from "../models/product.model";
import { initUserModel } from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT as any,
    storage: process.env.DB_STORAGE,
    logging: false
});

async function initSequelize() {
    initProductModel(sequelize);
    initUserModel(sequelize);

    await sequelize.sync();
    await sequelize.authenticate();
}

initSequelize();

