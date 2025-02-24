import express from 'express'
import bodyParser from 'body-parser'
import order_routes from './handlers/orders'
import product_routes from './handlers/products'
import user_routes from './handlers/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

product_routes(app)
user_routes(app)
order_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
