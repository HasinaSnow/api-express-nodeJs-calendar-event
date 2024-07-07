import Items from "../items";

describe('Items', () => {

    it('should return first test', () => {
        expect(Items.getFirstItem()).toBe('First Item')
    });
})