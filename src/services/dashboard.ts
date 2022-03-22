import client from '../database';
import { Order } from '../models/order';
import { Product } from '../models/product';

export class DashboardQueries {
  //NOTE: Where to put isUserAdmin? Not a model? No handler-> so no route->better placed here. This keeps routes/models clean.
  async isUserAdmin(tokenUid: number): Promise<boolean> {
    try {
      const sql = 'SELECT * FROM users WHERE id = ($1);';
      const conn = await client.connect();
      const results = await conn.query(sql, [tokenUid]);
      return results.rows[0].admin;
    } catch (err) {
      throw new Error(`User is not Admin!`);
    }
  }
  async popularProducts(): Promise<{ productid: number; sum: number }[]> {
    try {
      const sql =
        'SELECT productid, sum(quantity) FROM order_products GROUP BY ROLLUP(productid) ORDER BY sum(quantity) DESC LIMIT 6;';
      const conn = await client.connect();
      const filtered = (await conn.query(sql)).rows.filter(item => {
        if (item.productid !== null) {
          // console.log('item', item, typeof item);
          return item;
          // return {item.productid, item.sum};
        }
      });
      conn.release();
      return filtered;
    } catch (err) {
      throw new Error(`Something went wrong!`);
    }
  }

  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE products.category = ($1);';
      const conn = await client.connect();
      const results = await conn.query(sql, [category]);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Something went wrong! There is no category ${category}`);
    }
  }

  async userOrdersCompleted(uid: string): Promise<Order[]> {
    try {
      const sql =
        "SELECT * FROM orders WHERE userId= ($1) AND orders.status='complete';";
      const conn = await client.connect();
      const results = await conn.query(sql, [uid]);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(
        `Something went wrong! No complete orders for user id = ${uid}`
      );
    }
  }
}
