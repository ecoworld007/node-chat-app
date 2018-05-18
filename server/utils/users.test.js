const expect = require('expect');

const {Users} = require('./users');

describe('Users test cases', () => {
    it('should user to users array', (done) => {
        let users = new Users();
        let user = {
            id: '1',
            name: 'luffy',
            room: 'straw hat'
        }
        users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
        done();
    });
})