// import express, { Request, Response } from 'express';
import { Request, Response } from 'express';
import * as express from 'express';
// import * as express.Application from 'express';
import { Product, ProductStore } from '../models/product';
import { AuthStore } from '../middleware/auth';

const productStore = new ProductStore();
const auth = new AuthStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await productStore.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const showAllProducts = await productStore.show(req.params.id);
    res.json(showAllProducts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const newProductDetails: Product = {
    name: req.body.name,
    price: Number(req.body.price),
    category: req.body.category,
    url: req.body.url,
    snippet: req.body.snippet,
    description: req.body.description,
    accreditation: req.body.accreditation
  };
  try {
    const newProduct = await productStore.create(newProductDetails);
    res.json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const update = async (req: Request, res: Response) => {
  const currentProductDetails = await productStore.show(req.params.id);
  try {
    if (req.body.name) {
      currentProductDetails.name = req.body.name;
    }
    if (req.body.price) {
      currentProductDetails.price = req.body.price;
    }
    if (req.body.category) {
      currentProductDetails.category = req.body.category;
    }
    if (req.body.url) {
      currentProductDetails.url = req.body.url;
    }
    if (req.body.snippet) {
      currentProductDetails.snippet = req.body.snippet;
    }
    if (req.body.description) {
      currentProductDetails.description = req.body.description;
    }
    if (req.body.accreditation) {
      currentProductDetails.accreditation = req.body.accreditation;
    }
    const updatedProduct = await productStore.update(currentProductDetails);
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const productDelete = await productStore.delete(req.params.id);
    res.json(productDelete);
  } catch (err) {
    res.status(400).json(err);
  }
};

const productRoutes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products/create', auth.verifyAuthToken, auth.verifyAdmin, create);
  app.put('/products/:id', auth.verifyAuthToken, auth.verifyAdmin, update);
  app.delete('/products/:id', auth.verifyAuthToken, auth.verifyAdmin, destroy);
};

export default productRoutes;
