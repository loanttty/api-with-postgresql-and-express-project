import express, { NextFunction, Request, Response } from 'express'
import { Order, OrderList } from '../models/order'
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
}

export default orders_routes