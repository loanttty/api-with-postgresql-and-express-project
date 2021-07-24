import client from '../database'

export type Order = {
    id: number,
    product_id: number,
    user_id: number,
    quantity: number,
    status: string
}

export class OrderList {
    async ordersByUser(id:string): Promise<Order[]> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            
            const conn = await client.connect()
            const result = await conn.query(sql,[id])

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not find any order for user with id ${id}: ${err}`)
        }
    }

    async completeOrdersByUser(id:string): Promise<Order[]> {
        try {
            
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            const result = await conn.query(sql,[id,"complete"])

            conn.release()

            return result.rows
        } catch(err) {
            throw new Error(`Could not find any complete order for user with id ${id}: ${err}`)
        }
    }
}