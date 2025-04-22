import { ProductRepositoryPrisma } from "../repositories/product/product.repository.prisma";
import { UserRepositoryPrisma } from "../repositories/user/user.repository.prisma";
import { ProductService } from "../services/product/product.service.implementation";
import { UserService } from "../services/user/user.service.implementation";
import { prisma } from "./prisma.util";

const userRepository = UserRepositoryPrisma.build(prisma);
export const userService = UserService.build(userRepository)

const productRepository = ProductRepositoryPrisma.build(prisma);
export const productService = ProductService.build(productRepository)