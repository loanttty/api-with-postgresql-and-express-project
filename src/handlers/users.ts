import express, { NextFunction, Request, Response } from 'express'
import { User, UserList } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'

const userlist = new UserList()

const index = async (_req:Request,res:Response) => {
    try {
        const users = await userlist.index()
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(users)
    } catch(err) {
        res.status(400).json(err)
    }
}
const show = async (req:Request,res:Response) => {
    try {
        const userById = await userlist.show(req.params.id)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(userById)
    } catch(err) {
        res.status(400).json(err)
    }
}
const create = async (req:Request,res:Response) => {   
    const newUser:User = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        password: req.body.password
    } 

    const TOKEN_SECRET = (process.env.TOKEN_SECRET as unknown) as Secret
    try {
        const newUserAdded = await userlist.create(newUser)
        const token = jwt.sign({user: newUserAdded},TOKEN_SECRET)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}

const authenticate = async (req:Request,res:Response) => {   
     
    try {
        const authUser = await userlist.authenticate(req.body.first_name,req.body.password)
        const TOKEN_SECRET = (process.env.TOKEN_SECRET as unknown) as Secret
        const token = jwt.sign({user: authUser},TOKEN_SECRET)
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.json(`Authenticated User!: ${token}`)
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
        // add "return" to avoid error "[ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
        return res.status(401).json(err)
    }
    next()
}

const users_routes = (app:express.Application) => {
    app.get('/users',verifyAuthUser,index)
    app.get('/user/:id',verifyAuthUser,show)
    app.post('/user/create',create)
    app.get('/authenticate',verifyAuthUser,authenticate)
}

export default users_routes