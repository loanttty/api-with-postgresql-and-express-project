import { DashboardQueries } from "../dashboard";

const queries = new DashboardQueries()

describe ('Dashboard Model', () => {

    it('should have a productsByCat method', () => {
        expect(queries.productsByCat).toBeDefined();
    });

    it('should have a topFivePopular method', () => {
        expect(queries.topFivePopular).toBeDefined();
    });

    it('productsByCat method should return a list of products under category "Speakers"', async () => {
        const result = await queries.productsByCat("Speakers")
        expect(result).toEqual([{
            "id": 4,
            "name": "Speaker",
            "price": 99,
            "category": "Speakers"
        }]);
    })

    it('topFivePopular method should return a list of five most ordered products', async () => {
        const result = await queries.topFivePopular()
        expect(result).toEqual([{
            "name": "Monitor",
            "price": 52,
            "ordered_quantity": 14
        },
        {
            "name": "Keyboard",
            "price": 23,
            "ordered_quantity": 4
        },
        {
            "name": "Speaker",
            "price": 99,
            "ordered_quantity": 2
        },
        {
            "name": "Classic Piano",
            "price": 198,
            "ordered_quantity": 1
        }]);
    })

})