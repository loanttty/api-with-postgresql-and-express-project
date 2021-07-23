import express, { Request, Response } from 'express'
import { DashboardQueries } from '../services/dashboard'

const dashboardRoutes = (app: express.Application) => {
    app.get('/products-by-category/:category', productsByCaterogy)
    app.get('/top-five-products', topFivePopular)
}

const dashboard = new DashboardQueries()

const productsByCaterogy = async (req: Request, res: Response) => {
  const products = await dashboard.productsByCat(req.params.category)
  res.json(products)
}

const topFivePopular = async (req: Request, res: Response) => {
  const products = await dashboard.topFivePopular()
  res.json(products)
}

export default dashboardRoutes
