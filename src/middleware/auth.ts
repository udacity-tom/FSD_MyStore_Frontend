import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import client from '../database';
import jwt from 'jsonwebtoken';
import express from 'express';
import { User } from '../models/user';
import { DashboardQueries } from '../services/dashboard';

//This file provides authentication functions, like: password encryption, JWT verification, middleware for authorisation, etc.

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = Number(process.env.SALT_ROUNDS);
const tokenSecret = String(process.env.TOKEN_SECRET);
const dashboardService = new DashboardQueries();
const jwtExpiry = '30day';
export class AuthStore {
  async authenticate(username: string, password: string): Promise<object> {
    // const jwtexpiry = '30day';
    // const jwtexpiry = jwtExpiry;
    // console.log('AuthStore: Recieved params', username, password);
    const conn = await client.connect();
    const sql = 'SELECT * FROM users WHERE username = ($1)';
    const result = await conn.query(sql, [username]);
    const user: User = result.rows[0];
    console.log('sql response', result.rows[0]);
    if (result.rows.length) {
      const userPassword = result.rows[0].password;
      const passwordCheck = bcrypt.compareSync(password + pepper, userPassword);
      if (passwordCheck) {
        // console.log('Yes, password checked out!');
        user.password = '';
        user.lastname = '';
        const newjwtToken = await this.createToken(user);
        // console.log('tokenreturn', { token: newjwtToken, expiry: jwtexpiry });
        const jwtPayload = jwt.decode(newjwtToken, { complete: true });
        // console.log(
        //   'Yes, token was generated. Look ->',
        //   newjwtToken,
        //   jwtPayload
        // );

        return { token: newjwtToken, expiry: jwtPayload?.payload.exp };
      } else {
        return { err: 'Failure-login refused, try again' };
      }
    }
    return { err: 'Unknown user, have you registered an account?' };
  }

  // async jwtexpiry(token: string): Promise<object> {
  //   const jwtPayload = jwt.decode(token, { complete: true });
  //   return jwtPayload;
  // }

  async hashPassword(password: string): Promise<string> {
    const hash = bcrypt.hashSync(password + pepper, saltRounds);
    return hash;
  }

  async createToken(jwtPayloadData: User): Promise<string> {
    // const jwtexpiry
    const options = {
      expiresIn: jwtExpiry,
      subject: 'access'
    };
    // console.log('testing the expiry value', jwtExpiry);
    try {
      // eslint-disable-next-line no-var
      var token: string = jwt.sign(
        jwtPayloadData,
        String(process.env.TOKEN_SECRET),
        options
      );
    } catch (err) {
      throw new Error(`Something went wrong. Error: ${err}`);
    }
    return token;
  }

  // async authorise(token: string): Promise<string> {
  //   try {
  //     jwt.verify(token, tokenSecret);
  //   } catch (err) {
  //     throw new Error(`Invalid Token!!`);
  //   }
  //   return 'valid';
  // }
  // async isAdmin(jwtID: number): Promise<boolean> {
  //   return await dashboardService.isUserAdmin(jwtID);
  // }

  async verifyAdmin(
    req: express.Request,
    res: express.Response,
    next: () => void
  ): Promise<void> {
    const authorisationHeader = String(req.headers.authorization);
    const jwtToken: string = authorisationHeader.split(' ')[1];
    const decoded = jwt.verify(jwtToken, tokenSecret);
    const jwtPayload = jwt.decode(jwtToken, { complete: true });

    try {
      if (decoded) {
        if (await dashboardService.isUserAdmin(jwtPayload?.payload.id)) {
          next();
        } else {
          res.status(403).json({ message: 'Unauthorized Access' });
        }
      }
    } catch (err) {
      res.status(401).json({ message: 'Invalid Token!' });
    }
  }

  async verifyUserAuth(
    req: express.Request,
    res: express.Response,
    next: () => void
  ): Promise<void> {
    const routeUid = Number(req.params.id);
    const authorisationHeader = String(req.headers.authorization);
    const jwtToken: string = authorisationHeader.split(' ')[1];
    const jwtPayload = jwt.decode(jwtToken, { complete: true });
    console.log('jwtPayload', jwtPayload);
    try {
      if (
        jwtPayload?.payload.id == routeUid ||
        (await dashboardService.isUserAdmin(jwtPayload?.payload.id))
      ) {
        next();
      } else {
        res.status(403).json({ message: 'Unauthorized Access' });
      }
    } catch (err) {
      res.status(403).json({ message: 'Unauthorized Access' });
    }
  }

  async verifyAuthToken(
    req: express.Request,
    res: express.Response,
    next: () => void
  ): Promise<void> {
    try {
      const authorisationHeader = String(req.headers.authorization);
      const jwtToken: string = authorisationHeader.split(' ')[1];
      const decoded = jwt.verify(jwtToken, tokenSecret);
      if (decoded) {
        next();
      }
    } catch (err) {
      res.status(401).json({ message: 'Invalid Token!' });
    }
  }
}
