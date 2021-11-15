import client from '../database';
import { AuthStore } from '../middleware/auth';

const auth = new AuthStore();

export type User = {
  id?: number;
  admin?: boolean;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  houseNum?: string;
  street1?: string;
  street2?: string;
  city?: string;
  postcode?: string;
  country?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users;';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find any users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`There is no user with ID ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      user.password = await auth.hashPassword(user.password);
      const sql =
        'INSERT INTO users (username, firstname, lastname, password, houseNum, street1, street2, city, postcode, country) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        user.password,
        user.houseNum,
        user.street1,
        user.street2,
        user.city,
        user.postcode,
        user.country
      ]);
      conn.release();
      return result.rows[0];
      //take supplied user and store in database, on success return user in json form
    } catch (err) {
      throw new Error(
        `Something went wrong, try again. Duplicate user account? Error: ${err}`
      );
    }
  }

  async update(user: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username= ($1), firstname= ($2), lastname=($3) WHERE users.id = ($4) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        user.id,
        user.password,
        user.houseNum,
        user.street1,
        user.street2,
        user.city,
        user.postcode,
        user.country
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Something went wrong with updating user with ID=${
          user.id
        } and name ${(user.firstname, ' ', user.lastname)}`
      );
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const feedback = await this.show(id);
      const sql = 'DELETE FROM users WHERE id=($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return `${
        result.rows.length == 0 ? 'Success!' : 'oops'
      } User with id = ${id} was ${
        result.rows.length == 0 ? 'not ' : ''
      }deleted, Username: ${feedback.username}, (${feedback.firstname} ${
        feedback.lastname
      })`;
    } catch (err) {
      throw new Error(`Cannot delete user with id = ${id}`);
    }
  }
}
