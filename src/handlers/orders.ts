import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderedProduct, OrderList } from '../models/order'
import jwt, { Secret } from 'jsonwebtoken'

const orderlist = new OrderList()

const ordersByUser = async (req:Request,res:Response) => {
    try {
        const ordersByUser = await orderlist.ordersByUser(req.params.id)
        res.json(ordersByUser)
    } catch(err) {
        res.status(400).json(err)
    }
}
const completeOrdersByUser = async (req:Request,res:Response) => {   
    try {
        const completeOrdersByUser = await orderlist.completeOrdersByUser(req.params.id)
        res.json(completeOrdersByUser)
    } catch(err) {
        res.status(400).json(err)
    }
}
const createOrder = async (req:Request,res:Response) => {   
    const newItem: Order = {
        status: req.body.status,
        user_id: req.body.userId,
    }

    try {
        const newOrder = await orderlist.create(newItem)
        res.json(newOrder)
    } catch(err) {
        res.status(400).json(err)
    }
}

const addProduct = async (req:Request,res:Response) => {   
    const newItem: OrderedProduct = {
        quantity: req.body.quantity,
        product_id: req.body.productId,
        order_id: req.body.orderId,
    }

    try {
        const addedProd = await orderlist.addProduct(newItem)
        res.json(addedProd)
    } catch(err) {
        res.status(400).json(err)
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

const orders_routes = (app:express.Application) => {
    app.get('/order/user/:id',verifyAuthUser,ordersByUser)
    app.get('/order/complete/user/:id',verifyAuthUser,completeOrdersByUser)
    app.post('/order/create',verifyAuthUser,createOrder)
    app.post('/order/add-product',verifyAuthUser,addProduct)
}

export default orders_routes