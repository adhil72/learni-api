import { mkdirSync, existsSync } from "fs"
const createFolder = (folderPath: string) => {
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath, { recursive: true });
    }
}

export { createFolder }