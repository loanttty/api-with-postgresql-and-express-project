import { DashboardQueries } from "../../services/dashboard";

const queries = new DashboardQueries()

describe ('Dashboard Model', () => {

    it('should have a productsByCat method', () => {
        expect(queries.productsByCat).toBeDefined();
    });

    it('should have a topFivePopular method', () => {
        expect(queries.topFivePopular).toBeDefined();
    });

    it('productsByCat method should return a list of products under category "Desktop"', async () => {
        const result = await queries.productsByCat("Desktop")
        expect(result).toEqual([{
            id: 1,
            name: "Monitor",
            price: 54,
            category: "Desktop"
        }]);
    })

    it('topFivePopular method should return a list of five most ordered products', async () => {
        const result = await queries.topFivePopular()
        expect(result).toEqual([{
            "name": "Monitor",
            "price": 54,
            "ordered_quantity": 2
        }]);
    })

})