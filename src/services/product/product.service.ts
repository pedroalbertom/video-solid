import { BuyOutputDto, CreateOutputDto, ListOutputDto, SellOutputDto } from "../../dto/product.dto"

export interface IProductService {
    create(name: string, price: number): Promise<CreateOutputDto>
    sell(id: string, amount: number): Promise<SellOutputDto>
    buy(id: string, amount: number): Promise<BuyOutputDto>
    list(): Promise<ListOutputDto>
}