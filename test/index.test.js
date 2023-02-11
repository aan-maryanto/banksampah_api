const sum = require("./index")
describe("test \'Sum\'", () => {
    test("test hasil benar", () => {
        expect(sum(3, 1)).toBe(4)
    }),
    test("test hasil salah", () => {
        expect(sum(2, 1)).toBe(2)
    })
})