import { Robot } from './robot';

describe('Given the class Robot', () => {
    describe('When we instantiate an object', () => {
        test(`Then the created object should 
        have the product and count properties:`, () => {
            const obj = new Robot('', '', 0, 0, '');
            expect(obj).toBeInstanceOf(Robot);
            expect(obj).toHaveProperty('name');
            expect(obj).toHaveProperty('image');
            expect(obj).toHaveProperty('speed');
            expect(obj).toHaveProperty('life');
            expect(obj).toHaveProperty('born');
        });
    });
});
