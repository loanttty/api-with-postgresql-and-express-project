import { OrderList } from "../../models/order";

const list = new OrderList()

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

    it('ordersByUser method should return a list of orders under specific user id', async () => {
        const result = await list.ordersByUser('1')
        expect(result).toEqual([]);
    })

    it('completeOrdersByUser method should return a list of complete orders under specific user id', async () => {
        const result = await list.completeOrdersByUser('2')
        expect(result).toEqual([]);
    })

    it('create method should return a new order', async () => {
        const result = await list.create({
            status: "complete",
            user_id: 1,
        })
        expect(result).toEqual({
            id: 1,
            status: "complete",
            user_id: 1,
        });
    })

    it('addProduct method should add product_id 1 to order_id 1', async () => {
        const result = await list.addProduct({
            quantity: 2,
            product_id: 1,
            order_id: 1,
        })
        expect(result).toEqual({
            id: 1,
            quantity: 2,
            product_id: 1,
            order_id: 1
        });
    })

})