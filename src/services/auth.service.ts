import { Request } from "express";
import { addUserQuery, getUserWithEmailQuery, updatePasswordQuery } from "../db/Table/users.table";
import { randomUUID } from "crypto"
import { compareSync, hashSync } from "bcrypt"
import { sign } from "../Helpers/Jwt";
export const authService = async (req: Request) => {
    let data: { email: string, password: string, id: string } = req.body
    let user = await getUserWithEmailQuery(data.email)
    if (user) {
        if (compareSync(data.password, user.password)) {
            let token = sign({ id: user.id, email: user.email })
            return { message: 'Login successful', success: true, data: { token } }
        }
        throw new Error('Invalid password')
    }
    data.password = hashSync(data.password, 10);
    data.id = randomUUID();
    await addUserQuery(data)
    let token = sign({ id: data.id, email: data.email })
    return { message: 'User added successfully', success: true, data: { token } }
}

export const updatePassword = async (req: Request) => {
    let data: {
        email: string,
        password: string
    } = req.body
    await updatePasswordQuery((req.headers as any).id, data.password)
    return { message: 'Password updated successfully', success: true, data: {} }
}
