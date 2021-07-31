import { OrderList } from "../../models/order";
import { Inventory } from "../../models/product";
import { UserList } from "../../models/user";

const list = new OrderList()
const inventory = new Inventory()
const userList = new UserList()

describe ('Order Model', () => {

    it('should have an ordersByUser method', () => {
        expect(list.ordersByUser).toBeDefined();
    });

    it('should have a completeOrdersByUser method', () => {
        expect(list.completeOrdersByUser).toBeDefined();
    });

    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });

    it('should have a addProduct method', () => {
        expect(list.addProduct).toBeDefined();
    });

    it('should have a topFivePopular method', () => {
        expect(list.topFivePopular).toBeDefined();
    });

    it('create method should return a new order', async () => {
        const newUser = await userList.create({
            first_name: "Jennie",
            last_name: "Kim",
            password: "hehe666"
        })

        const result = await list.create({
            status: "complete",
            user_id: (newUser.id as unknown) as number,
        })
        expect(result).toEqual({
            id: result.id,
            status: "complete",
            user_id: (newUser.id as unknown) as number,
        });
    })

    it('addProduct method should add a product to an order', async () => {
        
        const newProduct = await inventory.create({
            name: "Mouse",
            price: 12,
            category: "Desktop"
        })
        const newUser = await userList.create({
            first_name: "Julia",
            last_name: "Kang",
            password: "hihi333"
        })

        const newOrder = await list.create({
            status: "complete",
            user_id: (newUser.id as unknown) as number,
        })

        const result = await list.addProduct({
            quantity: 2,
            product_id: (newProduct.id as unknown) as number,
            order_id: (newOrder.id as unknown) as number
        })
        expect(result).toEqual({
            id: result.id,
            quantity: 2,
            product_id: (newProduct.id as unknown) as number,
            order_id: (newOrder.id as unknown) as number
        });
    })

    it('ordersByUser method should return a list of orders under specific user id', async () => {
        const result = await list.ordersByUser('1')
        expect(result).toEqual([{ id: 1, status: 'complete', user_id: 1 }]);
    })

    it('completeOrdersByUser method should return a list of complete orders under specific user id', async () => {
        const result = await list.completeOrdersByUser('1')
        expect(result).toEqual([{ id: 1, status: 'complete', user_id: 1 }]);
    })

    it('topFivePopular method should return a list of five most ordered products', async () => {
        const result = await list.topFivePopular()
        expect(result).toEqual([{
            "name": "Mouse",
            "price": 12,
            "ordered_quantity": 2
        }]);
    })
})