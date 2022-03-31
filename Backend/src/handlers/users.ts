import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import { AuthStore } from '../middleware/auth';
import checkUserName from '../middleware/checkUserName';

const userStore = new UserStore();
const auth = new AuthStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await userStore.index();
    res.json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await userStore.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      admin: req.body.admin || false,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      housenum: req.body.housenum || '',
      street1: req.body.street1 || '',
      street2: req.body.street2 || '',
      city: req.body.city || '',
      postcode: req.body.postcode || '',
      country: req.body.country || ''
    };
    const newUser = await userStore.create(user);
    const jwtPayloadData: User = {
      id: newUser.id,
      username: newUser.username,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      password: '',
      housenum: '',
      street1: '',
      street2: '',
      city: '',
      postcode: '',
      country: ''
    };
    const token = await auth.createToken(jwtPayloadData);
    const jwtPayload = await auth.getPayload(token);
    res.send({ newUser, token, jwtPayload });
  } catch (err) {
    res.status(400).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userAuthjwt = await auth.authenticate(username, password);
    res.send(userAuthjwt); //returns jwt
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const currentUserDetails = await userStore.show(req.params.id);
    if (req.body.username) {
      currentUserDetails.username = req.body.username;
    }
    if (req.body.firstname) {
      currentUserDetails.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      currentUserDetails.lastname = req.body.lastname;
    }
    if (req.body.password) {
      currentUserDetails.password = req.body.password;
    }
    if (req.body.housenum) {
      currentUserDetails.housenum = req.body.housenum;
    }
    if (req.body.street1) {
      currentUserDetails.street1 = req.body.street1;
    }
    if (req.body.city) {
      currentUserDetails.city = req.body.city;
    }
    if (req.body.postcode) {
      currentUserDetails.postcode = req.body.postcode;
    }
    if (req.body.country) {
      currentUserDetails.country = req.body.country;
    }

    const updateUser = await userStore.update(currentUserDetails);

    res.status(200).json(updateUser);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;
    const userDelete = await userStore.delete(idToDelete);
    res.json(userDelete);
  } catch (err) {
    res.status(400).send(err);
  }
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', auth.verifyAuthToken, auth.verifyUserAuth, index);
  app.get('/users/:id', auth.verifyAuthToken, auth.verifyUserAuth, show);
  app.post('/users/create', checkUserName, create); // == new user & return JWT
  app.post('/users/authenticate', authenticate); // == login & issue new JWT
  app.put('/users/:id', auth.verifyAuthToken, auth.verifyUserAuth, update);
  app.delete('/users/:id', auth.verifyAuthToken, auth.verifyUserAuth, destroy);
};

export default userRoutes;
