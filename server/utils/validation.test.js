const expect = require('expect');

const {isRealString} = require('./validation');

describe('Validation Test cases',() => {
    it('should reject non string input', (done) => {
        let name = 67;
        let room = true;
        expect(isRealString(name)).toBeFalsy();
        expect(isRealString(room)).toBeFalsy();   
        done();     
    });
    it('should reject all space character string', (done) =>{
        let name = '     ';
        expect(isRealString(name)).toBeFalsy();
        done();
    });
    it('should accept string input', (done) => {
        let name = 'himanshu';
        expect(isRealString(name)).toBeTruthy();
        done();
    });
});