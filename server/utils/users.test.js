const expect = require('expect');

const {Users} = require('./users');

describe('Users test cases', () => {
    let users = [];
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'luffy',
                room: 'straw hat'
            },
            {
                id: '2',
                name: 'zoro',
                room: 'straw hat'
            },
            {
                id: '3',
                name: 'marco',
                room: 'whitebeard'
            },
            {
                id: '4',
                name: 'ace',
                room: 'whitebeard'
            }
        ]
    })

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
    it('should get list of user in straw hat', (done) => {
        let actualUserNames = users.getUserList('straw hat');
        expect(actualUserNames).toEqual(['luffy', 'zoro']);
        done();
    });
    it('should get list of user in whitebeard', (done) => {
        let actualUserNames = users.getUserList('whitebeard');
        expect(actualUserNames).toEqual(['marco', 'ace']);
        done();
    });
    it('should find user with given id', (done) => {
        let user = users.getUser('1');
        expect(user).toBeDefined();
        expect(user).toEqual({
            id: '1',
            name: 'luffy',
            room: 'straw hat'
        });
        done();
    });
    it('should not find user with given id', (done) => {
        let user = users.getUser('6');
        expect(user).toBeUndefined();
        done();
    });
    it('should remove user with given id', (done) => {
        let user = users.removeUser('3');
        expect(user).toBeDefined();
        expect(user).toEqual({
            id: '3',
            name: 'marco',
            room: 'whitebeard'
        });
        done();
    });
    it('should not remove user with given id', (done) => {
        let user = users.removeUser('0');
        expect(user).toBeUndefined();
        done()
    });
})