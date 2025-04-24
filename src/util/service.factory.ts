import { ProductRepositoryPrisma } from "../repositories/product/product.repository.prisma";
import { ProductRepositorySequelize } from "../repositories/product/product.repository.sequelize";
import { UserRepositoryPrisma } from "../repositories/user/user.repository.prisma";
import { UserRepositorySequelize } from "../repositories/user/user.repository.sequelize";
import { ProductService } from "../services/product/product.service.implementation";
import { UserService } from "../services/user/user.service.implementation";
import { prisma } from "./prisma.factory";
import "./sequelize.factory";

const userRepositoryPrisma = UserRepositoryPrisma.build(prisma);
export const userServicePrisma = UserService.build(userRepositoryPrisma)

const productRepositoryPrisma = ProductRepositoryPrisma.build(prisma);
export const productServicePrisma = ProductService.build(productRepositoryPrisma)

const userRepositorySequelize = UserRepositorySequelize.build();
export const userServiceSequelize = UserService.build(userRepositorySequelize)

const productRepositorySequelize = ProductRepositorySequelize.build();
export const productServiceSequelize = ProductService.build(productRepositorySequelize)