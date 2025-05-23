import { Product } from "../../entities/product/product"
import { IProductRepository } from "../../repositories/product/product.repository"
import { BuyOutputDto, CreateOutputDto, ListOutputDto, SellOutputDto } from "../../dtos/product/product.dto"
import { IProductService } from "./product.service"

export class ProductService implements IProductService {

    private constructor(readonly repository: IProductRepository) { }

    public static build(repository: IProductRepository) {
        return new ProductService(repository)
    }

    public async create(name: string, price: number): Promise<CreateOutputDto> {

        if (!name || !price) throw new Error("Campos faltando, informe o nome e o preço do produto")

        const aProduct = Product.create(name, price)

        await this.repository.save(aProduct)

        const output: CreateOutputDto = {
            id: aProduct.id,
            balance: aProduct.quantity
        }

        return output
    }

    public async sell(id: string, amount: number): Promise<SellOutputDto> {
        if (!id || !amount) throw new Error("Campos faltando, informe o id e a quantidade do produto")

        const aProduct = await this.repository.find(id)

        if (!aProduct) throw new Error(`O produto ${id} não foi encontrado`)

        aProduct.sell(amount)

        await this.repository.update(aProduct)

        const output: SellOutputDto = {
            id: aProduct.id,
            balance: aProduct.quantity
        }

        return output
    }

    public async buy(id: string, amount: number): Promise<BuyOutputDto> {
        if (!id || !amount) throw new Error("Campos faltando, informe o id e a quantidade do produto")

        const aProduct = await this.repository.find(id)

        if (!aProduct) throw new Error(`O produto ${id} não foi encontrado`)

        aProduct.buy(amount)

        await this.repository.update(aProduct)

        const output: BuyOutputDto = {
            id: aProduct.id,
            balance: aProduct.quantity
        }

        return output
    }

    public async list(): Promise<ListOutputDto> {
        const aProducts = await this.repository.list()

        const products = aProducts.map(p => {
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                balance: p.quantity
            }
        })

        const output: ListOutputDto = {
            products
        }

        return output
    }

}