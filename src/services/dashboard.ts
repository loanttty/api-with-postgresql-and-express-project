import client from '../database'
import { Product } from '../models/product'

export class DashboardQueries {
  // Get all products under specific category
  async productsByCat(category: string): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products WHERE products.category=($1)'
      
      const result = await conn.query(sql,[category])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get any products under category ${category}: ${err}`)
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
