const sum = require("./sum")
describe("membuat test \'sum()\'", function () {
    test("expected true", function () {
        expect(sum(4, 1)).toBe(5)
    })
});