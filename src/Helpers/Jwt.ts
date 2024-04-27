import jwt from "jsonwebtoken"

export const sign = (data: any) => jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn: (24 * 30) + 'h' })
export const verify = (token: string) => jwt.verify(token, process.env.JWT_SECRET as string) as any    