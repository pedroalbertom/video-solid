import bcrypt from 'bcrypt'

export async function hashPassword(plain: string): Promise<string> {
    return await bcrypt.hash(plain, 10)
}
