import client from '../database'

export type User = {
    id?: number,
    first_name: string,
    last_name: string,
    password: string
}

export class UserList {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users'
            
            const conn = await client.connect()
            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not get users: ${err}`)
        }
    }

    async show(id:string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            
            const conn = await client.connect()
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows[0]
        } catch(err) {
            throw new Error(`Could not find user with id ${id}: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            
            const conn = await client.connect()
            const result = await conn.query(sql,[u.first_name, u.last_name, u.password])
            const user = result.rows[0]
            conn.release()

            return user
        } catch(err) {
            throw new Error(`Could not create new user: ${err}`)
        }
    }
}