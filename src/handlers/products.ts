import express, { NextFunction, Request, Response } from 'express'
import { Product, Inventory } from '../models/product'
import jwt, { Secret } from 'jsonwebtoken'

const inventory = new Inventory()

const index = async (_req:Request,res:Response) => {
    try {
        const products = await inventory.index()
        res.json(products)
    } catch(err) {
        res.status(400).json(err)
    }
}

const show = async (req:Request,res:Response) => {
    try {
        const productById = await inventory.show(req.params.id)
        res.json(productById)
    } catch(err) {
        res.status(400).json(err)
    }
}

const create = async (req:Request, res:Response) => {   
    const newProduct:Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }

    try {
        const newProductAdded = await inventory.create(newProduct)
        res.json(newProductAdded)
    } catch(err) {
        res.status(400).json(err)
        return
    }
}

const verifyAuthUser = async (req:Request, res:Response, next: NextFunction) => {
    const TOKEN_SECRET = (process.env.TOKEN_SECRET as unknown) as Secret
    try {
        const authorizationHeader = (req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token,TOKEN_SECRET)
    } catch(err) {
        res.status(401).json(err)
    }
    next()
}

const products_routes = (app:express.Application) => {
    app.get('/products',index)
    app.get('/product/:id',show)
    app.post('/create',verifyAuthUser,create)
}

export default products_routes