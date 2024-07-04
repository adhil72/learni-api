import { Request, Response } from "express"

const getFile = async (req: Request, res: Response) => {
    const fileName = req.query.name
    const filePath = process.cwd() + `/public/audio/${fileName}`
    res.download(filePath)
}

export default { getFile }