import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/products-by-category/:category', productsByCaterogy)
}

const dashboard = new DashboardQueries()

const productsByCaterogy = async (req: Request, res: Response) => {
  const products = await dashboard.productsByCat(req.params.id)
  res.json(products)
}

export default dashboardRoutes
