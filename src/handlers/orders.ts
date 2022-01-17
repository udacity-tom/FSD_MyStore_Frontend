import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import { AuthStore } from '../middleware/auth';

const orderStore = new OrderStore();
const auth = new AuthStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await orderStore.index();
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
}; //shows all orders

const show = async (req: Request, res: Response) => {
  try {
    const orders = await orderStore.show(req.params.oid);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
}; //returns only one order

const showOrder = async (req: Request, res: Response) => {
  try {
    console.log('showOrder req', req.params);
    const orders = await orderStore.showOrder(req.params.id, req.params.oid);
    console.log('showOrder return from DB', orders);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
}; //returns items in one user order

const showUserOrders = async (req: Request, res: Response) => {
  try {
    // console.log('showUserOrder req', req.params.id);
    const orders = await orderStore.showUserOrders(req.params.id);
    console.log('showUserOrder return from DB', orders);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
}; //returns all users orders

const showActiveOrder = async (req: Request, res: Response) => {
  try {
    const activeOrder = await orderStore.showActiveOrder(req.params.id);
    console.log('orders.ts showActiveOrder()', activeOrder);
    res.json(activeOrder);
  } catch (err) {
    res.status(400).json(err);
  }
}; //returns activeOrder

const create = async (req: Request, res: Response) => {
  try {
    let status: string = req.body.status;
    if (status == undefined) {
      status = 'active';
    }
    const orders = await orderStore.create(req.params.id, status);
    res.json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const orderToDelete = await orderStore.delete(
      req.params.id,
      req.params.oid
    );
    res.json(orderToDelete);
  } catch (err) {
    res.status(400).send(err);
  }
};
const update = async (req: Request, res: Response) => {
  //updates order status
  try {
    const orderToUpdate = await orderStore.update(
      req.params.id,
      req.params.oid
    );
    res.json(orderToUpdate);
  } catch (err) {
    res.status(400).send(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const addProducts = await orderStore.addProduct(
      Number(req.params.id), //user id
      req.body.quantity,
      Number(req.params.oid),
      req.body.id //product id
    );
    res.json(addProducts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    console.log(
      'orders.ts handler removeProduct called info ',
      req.params.id,
      req.body.quantity,
      req.params.oid,
      req.body.id,
      req.params.opid
    );
    const removeProduct = await orderStore.removeProduct(
      req.params.id, //user id
      req.body.quantity,
      req.params.oid,
      req.body.id, //product id
      req.params.opid
    );
    res.json(removeProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.get('/orders', auth.verifyAuthToken, auth.verifyUserAuth, index); //show all orders
  app.get('/orders/:oid', auth.verifyAuthToken, auth.verifyUserAuth, show); //show only one order
  app.get(
    '/users/:id/orders',
    auth.verifyAuthToken,
    auth.verifyUserAuth,
    showUserOrders
  ); //show current orders for user (id)
  app.get(
    '/users/:id/activeorder',
    // auth.verifyAuthToken,
    // auth.verifyUserAuth,
    showActiveOrder
  );
  app.get(
    '/users/:id/orders/:oid',
    auth.verifyAuthToken,
    auth.verifyUserAuth,
    showOrder
  ); //shows details of order for user (id) with order (oid)
  app.post(
    '/users/:id/orders/create',
    auth.verifyAuthToken,
    auth.verifyUserAuth,
    create
  );
  app.post(
    '/users/:id/orders/:oid/add-product',
    auth.verifyAuthToken,
    auth.verifyUserAuth,
    addProduct
  );
  app.post(
    '/users/:id/orders/:oid/delete-product/:opid',
    auth.verifyAuthToken,
    auth.verifyUserAuth,
    removeProduct
  );
  //updates order status
  app.put(
    '/users/:id/orders/:oid',
    auth.verifyAuthToken,
    auth.verifyUserAuth,
    update
  );
  app.delete(
    '/users/:id/orders/:oid',
    auth.verifyAuthToken,
    auth.verifyAdmin,
    destroy
  );
};

export default orderRoutes;
