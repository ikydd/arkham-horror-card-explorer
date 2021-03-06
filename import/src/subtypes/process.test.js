const process = require('./process');


describe('process factions', () => {
    let mockData = require('../../../fixtures/api/subtypes-cards');

    it('outputs the correct number of subtypes', () => {
        const output = process(mockData);

        expect(output.length).toEqual(4);
    });

    it('gives each subtype a code', () => {
        const output = process(mockData);

        expect(output.map(({ code }) => code)).toEqual([
            "AP",
            "Code Gate",
            "Sentry",
            "Trap"
        ]);
    });

    it('orders the subtypes alphabetically', () => {
        const output = process(mockData);

        expect(output.map(({ name }) => name)).toEqual([
            "AP",
            "Code Gate",
            "Sentry",
            "Trap"
        ]);
    });

    it('outputs the side code', () => {
        let mockData = require('../../../fixtures/api/subtypes-cards-sides');
        const output = process(mockData);

        expect(output.map(({ side }) => side)).toEqual([
            "corp",
            "runner",
            "runner",
            "corp"
        ]);
    });

    it('outputs null when a subtype is for both sides', () => {
        let mockData = require('../../../fixtures/api/subtypes-cards-dualside');
        const output = process(mockData);

        expect(output[0].side).toBeNull();
    });
})
