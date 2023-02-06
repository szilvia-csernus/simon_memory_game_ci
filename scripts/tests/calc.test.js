/**
 * @jest-environment jsdom
 */

const addition = require('../calc.js');

describe('Calculator', () => {
    describe('Addition function', () => {
        test('should return 42 for 20 + 22', () => {
            expect(addition(20,22)).toBe(42);
        });
        test('should return 15 for 10 + 5', () => {
            expect(addition(10,5)).toBe(15);
        });
    })
    // describe('Subtraction function', () => {
    //     test('should return 18 for 20 - 2', () => {
    //         expect(addition(20,2)).toBe(18);
    //     })
    // })
    // describe('Multiplication function', () => {
    //     test('should return 44 for 2 * 22', () => {
    //         expect(addition(2,22)).toBe(44);
    //     })
    // })
    // describe('Division function', () => {
    //     test('should return 2 for 22 / 11', () => {
    //         expect(addition(22,11)).toBe(2);
    //     })
    // })
})