import { User, UserList } from "../user";

const list = new UserList()

describe ('User Model', () => {
    it('should have an index method', () => {
        expect(list.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(list.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(list.create).toBeDefined();
    });

    it('index method should return a list of users', async () => {
        const result = await list.index()
        expect(result).toEqual([]);
    })

    it('create method should add a user', async () => {
        const result = await list.create({
            first_name: 'Juno',
            last_name: 'Song',
            password: 'ahihi123'
        })
        expect(result).toEqual({
            id: 1,
            first_name: 'Juno',
            last_name: 'Song',
            password: 'ahihi123'
        });
    })

    it('index method should show all users', async () => {
        const result = await list.index()
        expect(result).toEqual([{
            id: 1,
            first_name: 'Juno',
            last_name: 'Song',
            password: 'ahihi123'
        }]);
    })

    it('show method should return the correct user', async () => {
        const result = await list.show('1')
        expect(result).toEqual({
            id: 1,
            first_name: 'Juno',
            last_name: 'Song',
            password: 'ahihi123'
        });
    })

})