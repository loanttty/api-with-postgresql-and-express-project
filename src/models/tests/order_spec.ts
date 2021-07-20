import { OrderList } from "../order";

const list = new OrderList()

describe ('Order Model', () => {

    it('should have an ordersByUser method', () => {
        expect(list.ordersByUser).toBeDefined();
    });

    it('should have a completeOrdersByUser method', () => {
        expect(list.completeOrdersByUser).toBeDefined();
    });

    it('ordersByUser method should return a list of orders under specific user id', async () => {
        const result = await list.ordersByUser('1')
        expect(result).toEqual([]);
    })

    it('completeOrdersByUser method should a list of complete orders under specific user id', async () => {
        const result = await list.completeOrdersByUser('2')
        expect(result).toEqual([]);
    })

})