import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderedProduct, OrderList } from '../models/order'
import jwt, { Secret } from 'jsonwebtoken'

const orderlist = new OrderList()

const ordersByUser = async (req:Request,res:Response) => {
    try {
        const ordersByUser = await orderlist.ordersByUser(req.params.id)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(ordersByUser)
    } catch(err) {
        res.status(400).json(err)
    }
}
const completeOrdersByUser = async (req:Request,res:Response) => {   
    try {
        const completeOrdersByUser = await orderlist.completeOrdersByUser(req.params.id)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(completeOrdersByUser)
    } catch(err) {
        res.status(400).json(err)
    }
}
const createOrder = async (req:Request,res:Response) => {   
    const newItem: Order = {
        status: req.body.status,
        user_id: req.body.userId
    }

    try {
        const newOrder = await orderlist.create(newItem)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(newOrder)
    } catch(err) {
        res.status(400).json(err)
    }
}

const addProduct = async (req:Request,res:Response) => {   
    const newItem: OrderedProduct = {
        quantity: req.body.quantity,
        product_id: req.body.productId,
        order_id: req.body.orderId
    }

    try {
        const addedProd = await orderlist.addProduct(newItem)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(addedProd)
    } catch(err) {
        res.status(400).json(err)
    }
}

const topFivePopular = async (_req: Request, res: Response) => {
    const products = await orderlist.topFivePopular()
    // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
    return res.json(products)
}

const verifyAuthUser = async (req:Request, res:Response, next: NextFunction) => {
    const TOKEN_SECRET = (process.env.TOKEN_SECRET as unknown) as Secret
    try {
        const authorizationHeader = (req.headers.authorization as unknown) as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token,TOKEN_SECRET)
    } catch(err) {
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.status(401).json(err)
    }
    next()
}

const orders_routes = (app:express.Application) => {
    app.get('/order/user/:id',verifyAuthUser,ordersByUser)
    app.get('/order/complete/user/:id',verifyAuthUser,completeOrdersByUser)
    app.post('/order/create',verifyAuthUser,createOrder)
    app.post('/order/add-product',verifyAuthUser,addProduct)
    app.get('/top-five-products', topFivePopular)
}

export default orders_routes