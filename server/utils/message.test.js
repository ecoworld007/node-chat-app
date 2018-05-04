const expect = require('expect');

const {generateMessage} = require('../utils/message');

describe('message.js test cases', () => {
    it('should return message object', (done) => {
        let from = 'mike';
        let text = 'testng the message.js';
        expect(generateMessage(from, text)).toMatchObject({from, text});
        done();
    });
});
