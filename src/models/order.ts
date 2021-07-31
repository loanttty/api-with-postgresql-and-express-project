import client from '../database'

export type Order = {
    id?: number,
    status: string,
    user_id: number,
}

export type OrderedProduct = {
    id?: number,
    quantity: number,
    product_id: number,
    order_id: number,
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

    async create(o: Order): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn
                .query(sql, [o.status, o.user_id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add new order: ${err}`)
        }
    }

    async addProduct(op: OrderedProduct): Promise<OrderedProduct> {
        //add products to an existing order
        try {
            const sql = 'INSERT INTO order_product (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()

            const result = await conn.query(sql, [op.quantity, op.order_id, op.product_id])

            const order = result.rows[0]

            conn.release()

            return order
        } catch (err) {
            throw new Error(`Could not add product ${op.product_id} to order ${op.order_id}: ${err}`)
        }
    }

    async topFivePopular(): Promise<{name: string, price: number, ordered_quantity: number}[]> {
        try {
          const conn = await client.connect()
          const sql = 'SELECT name, price, SUM(order_product.quantity)::int as ordered_quantity FROM products INNER JOIN order_product ON products.id = order_product.product_id GROUP BY products.id ORDER BY ordered_quantity DESC LIMIT 5'
    
          const result = await conn.query(sql)
    
          conn.release()
    
          return result.rows
        } catch (err) {
          throw new Error(`something wrong: ${err}`)
        } 
      }

}