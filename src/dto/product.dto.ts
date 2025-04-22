export type SellOutputDto = {
    id: string
    balance: number
}

export type BuyOutputDto = {
    id: string
    balance: number
}

export type ListOutputDto = {
    products: {
        id: string,
        name: string,
        price: number,
        balance: number
    }[]
}

export type CreateOutputDto = {
    id: string
    balance: number
}