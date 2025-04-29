import { ProductRepositoryPrisma } from "../repositories/product/product.repository.prisma"
import { ProductRepositorySequelize } from "../repositories/product/product.repository.sequelize"
import { UserRepositoryPrisma } from "../repositories/user/user.repository.prisma"
import { UserRepositorySequelize } from "../repositories/user/user.repository.sequelize"
import { AuthService } from "../services/auth/auth.service.implementation"
import { ProductService } from "../services/product/product.service.implementation"
import { UserService } from "../services/user/user.service.implementation"
import { prisma } from "./prisma.factory"
import "./sequelize.factory"


const productRepositoryPrisma = ProductRepositoryPrisma.build(prisma)
const productRepositorySequelize = ProductRepositorySequelize.build()
export const productServicePrisma = ProductService.build(productRepositoryPrisma)
export const productServiceSequelize = ProductService.build(productRepositorySequelize)

const userRepositoryPrisma = UserRepositoryPrisma.build(prisma)
const userRepositorySequelize = UserRepositorySequelize.build()
export const userServicePrisma = UserService.build(userRepositoryPrisma)
export const userServiceSequelize = UserService.build(userRepositorySequelize)

export const authServicePrisma = AuthService.build(userRepositoryPrisma)
export const authServiceSequelize = AuthService.build(userRepositorySequelize)