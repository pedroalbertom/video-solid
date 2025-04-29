import { Product } from "../../entities/product/product"
import { IProductRepository } from "./product.repository"
import { ProductModel } from "../../models/product.model"

export class ProductRepositorySequelize implements IProductRepository {
    private constructor() { }

    public static build() {
        return new ProductRepositorySequelize()
    }

    public async save(product: Product): Promise<void> {
        await ProductModel.create({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity
        })
    }

    public async list(): Promise<Product[]> {
        const models = await ProductModel.findAll()

        return models.map(p => Product.with(p.id, p.name, p.price, p.quantity))
    }

    public async update(product: Product): Promise<void> {
        await ProductModel.update({
            name: product.name,
            price: product.price,
            quantity: product.quantity
        }, {
            where: { id: product.id }
        })
    }

    public async find(id: string): Promise<Product | null> {
        const model = await ProductModel.findByPk(id)

        if (!model) return null

        return Product.with(model.id, model.name, model.price, model.quantity)
    }
}
