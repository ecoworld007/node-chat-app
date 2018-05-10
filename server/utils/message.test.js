const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('../utils/message');

describe('generateMessage', () => {
    it('should return correct message object', (done) => {
        let from = 'mike';
        let text = 'testng the message.js';
        expect(generateMessage(from, text)).toMatchObject({from, text});
        done();
    });
});

describe('generateLocationMessage', () => {
    it('should return correct location object', (done) => {
        let from = 'bob';
        let lat = '28.4594965';
        let lng = '77.0266383';
        let actual = generateLocationMessage(from, lat, lng);
        let expected = {from, url: `https://www.google.com/maps?q=${lat},${lng}`};
        expect(actual).toMatchObject(expected);
        expect(typeof actual.createdAt).toBe('number');
        done();
    });
});
