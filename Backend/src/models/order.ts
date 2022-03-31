import client from '../database';
import { User, UserStore } from './user';

const user = new UserStore();

export type Order = {
  id?: number;
  userId: number;
  status: string;
};
export type Order_products = {
  id: number; //order_products ID
  productId: number;
  quantity: number;
  orderId: number;
};
export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders ORDER BY id ASC;';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`There was an error finding products: ${err}`);
    }
  }

  //shows a specific order
  async show(id: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `There was an error with finding orders for user ID=${id}. Erro: ${err}`
      );
    }
  }

  //shows users orders
  async showUserOrders(uid: string): Promise<Order[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE userId=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [uid]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `There was an error with finding orders for user ID=${uid}. Error: ${err}`
      );
    }
  }

  //checks for orders for users-> then returns products in order
  async showOrder(id: string, oid: string): Promise<Order[] | string> {
    try {
      const currentOpenOrders = await this.showUserOrders(id);
      const hasOrder = currentOpenOrders.filter(order => {
        if (order.id == Number(oid)) {
          return true;
        }
      });
      if (hasOrder.length == 0) {
        return `User with ID = ${id} doesn't have an order with Order ID = ${oid}`;
      }
      const sql = 'SELECT * FROM order_products WHERE orderId=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [oid]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `There was an error with finding order ID=${id}. Err: ${err}`
      );
    }
  }

  //gets active order id number
  async showActiveOrder(uid: string): Promise<Order | string> {
    try {
      const currentActiveOrder = await this.showUserOrders(uid);
      const hasActiveOrder = currentActiveOrder.filter(order => {
        if (order.status == 'active') {
          return order;
        }
      });
      return hasActiveOrder[0];
    } catch (err) {
      throw new Error(`User has no active order!`);
    }
  }

  async create(id: string, status: string): Promise<Order | string> {
    try {
      const currentActiveOrder = await this.showUserOrders(id);
      const hasActiveOrder = currentActiveOrder.filter(order => {
        if (order.status == 'active') {
          return order;
        }
      });
      if (hasActiveOrder.length > 0) {
        return `User has an active order! Order No. : ${hasActiveOrder[0].id} is active. Cannot create a new order, until this order is complete.`;
      } else {
        const sql =
          'INSERT INTO orders (userId, status) VALUES ($1, $2) RETURNING *;';
        const conn = await client.connect();
        const result = await conn.query(sql, [id, status]);
        conn.release();
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(
        `There was an error with creating order for User ID = ${id}. Error: ${err}`
      );
    }
  }

  async update(uid: string, oid: string): Promise<Order | string> {
    //updates order status
    try {
      //do sanity check on order/user
      const currentActiveOrder = await this.showUserOrders(uid);
      const hasActiveOrder = currentActiveOrder.filter(order => {
        if (order.status == 'active') {
          return order;
        }
      });
      if (hasActiveOrder[0].id != Number(oid)) {
        return `User has no active order! Order No. : ${oid}`;
      } else {
        const sql =
          'UPDATE orders SET status= ($2) WHERE id= ($1) RETURNING *;';
        //userId -> id of user users
        const conn = await client.connect();
        const result = await conn.query(sql, [oid, 'complete']);
        conn.release();
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`There was an error with updating the order: ${oid}`);
    }
  }

  async delete(id: string, oid: string): Promise<string> {
    try {
      const feedback: Order = (await this.show(oid))[0];
      const userDetails: User = await user.show(String(feedback.userId));
      const adminDetails: User = await user.show(id);
      const sql = 'DELETE FROM orders WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [oid]);
      conn.release();
      return `${
        result.rows.length == 0 ? 'Success!' : 'oops'
      } Your order with id = ${oid} was deleted by ${adminDetails.username} (${
        adminDetails.firstname
      }, ${adminDetails.lastname}). Order ${oid} was for ${
        userDetails.username
      } with name: ${userDetails.firstname} ${userDetails.lastname}`;
    } catch (err) {
      throw new Error(`There was a problem deleting order with id = ${id}`);
    }
  }
  //before adding item, check what is already there, if yes add to the quantity, dump the product to add.
  async addProduct(
    id: number,
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<Order_products | Order[] | string> {
    try {
      let sql;
      let orderIdTrue, orderOpen;
      const currentOpenOrders = await this.showUserOrders(String(id)); //List of all orders for userId
      currentOpenOrders.filter(order => {
        if (order.id == Number(orderId)) {
          orderIdTrue = true;
          if (order.status == 'active') {
            orderOpen = true;
          }
        }
      });
      if (!orderIdTrue) {
        return `Order id ${orderId} does not match to user Id ${id}`;
      }
      if (!orderOpen) {
        return `Order id ${orderId} has been closed! Order status is marked as closed`;
      }

      const doesExist = await this.checkExistingItem(
        id, //use interface order_products
        quantity,
        orderId,
        productId
      );
      if (doesExist) {
        sql =
          'SELECT * FROM order_products WHERE orderId=($1) AND productId=($2);';
        const conn = await client.connect();
        const result = await conn.query(sql, [orderId, productId]);
        conn.release();
        return result.rows[0];
      } else {
        sql =
          'INSERT INTO order_products (quantity, orderId, productId) VALUES($1,$2,$3) RETURNING *;';
        const conn = await client.connect();
        const result = await conn.query(sql, [quantity, orderId, productId]);
        conn.release();
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }

  async checkExistingItem(
    id: number,
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<boolean | Order_products> {
    let sql =
      'SELECT * FROM order_products WHERE orderId=($1) AND productId=($2);';
    const conn = await client.connect();
    const result = await conn.query(sql, [orderId, productId]);
    const newResult = result;
    if (result.rows[0] == undefined) {
      return false;
    } else {
      sql =
        'UPDATE order_products SET quantity= ($1) WHERE id= ($2) AND orderId= ($3) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        Number(quantity) + Number(newResult.rows[0].quantity),
        newResult.rows[0].id,
        orderId
      ]);
      conn.release();
      return result.rows[0];
    }
  }

  async removeProduct(
    id: string, //userid
    quantity: number,
    orderId: string,
    productId: string,
    order_productId: string
  ): Promise<Order | string> {
    try {
      let orderIdTrue, orderOpen;
      const currentOpenOrders = await this.showUserOrders(id); //List of all orders for userId
      currentOpenOrders.filter(order => {
        if (order.id == Number(orderId)) {
          orderIdTrue = true;
          if (order.status == 'active') {
            orderOpen = true;
          }
        }
      });
      if (!orderIdTrue) {
        return `Order id ${orderId} does not match to user Id ${id}`;
      }
      if (!orderOpen) {
        return `Order id ${orderId} has been closed! Order status is marked as closed`;
      }
      const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [order_productId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
