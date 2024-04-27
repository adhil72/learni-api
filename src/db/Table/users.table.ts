import db from "../config"

const table = 'users'

const addUserQuery = async (data: { email: string, password: string, id: string }) => await db.client.query(`INSERT INTO ${table} (id, email, password) VALUES ('${data.id}', '${data.email}', '${data.password}')`)
const updatePasswordQuery = async (id: string, password: string) => await db.client.query(`UPDATE ${table} SET password = ${password} WHERE id = ${id}`)
const getUserWithEmailQuery = async (email: string) => await db.client.query(`SELECT * FROM ${table} WHERE email = '${email}'`).then((res) => { return res.rows[0] })

export {
    addUserQuery,
    getUserWithEmailQuery,
    updatePasswordQuery
}