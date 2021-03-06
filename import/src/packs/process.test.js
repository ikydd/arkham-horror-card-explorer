const process = require('./process');

const mockPacks = require('../../../fixtures/nrdb/packs');
const mockCycles = require('../../../fixtures/nrdb/cycles');


describe('process factions', () => {

    it('outputs the correct number of cycles', () => {
        const output = process(mockPacks, mockCycles);

        expect(output.length).toEqual(5);
    });

    it('outputs the correct number of packs', () => {
        const output = process(mockPacks, mockCycles);

        expect(output[0].items.length).toEqual(1);
        expect(output[1].items.length).toEqual(6);
        expect(output[2].items.length).toEqual(1);
        expect(output[3].items.length).toEqual(6);
        expect(output[4].items.length).toEqual(1);
    });

    it('outputs the names of the cycles', () => {
        const output = process(mockPacks, mockCycles);

        expect(output[0].name).toEqual(mockCycles.data[0].name);
        expect(output[1].name).toEqual(mockCycles.data[1].name);
        expect(output[2].name).toEqual(mockCycles.data[2].name);
    });

    it('outputs the names of the packs', () => {
        const output = process(mockPacks, mockCycles);

        expect(output[0].items[0].name).toEqual(mockPacks.data[0].name);
        expect(output[1].items[0].name).toEqual(mockPacks.data[1].name);
        expect(output[1].items[1].name).toEqual(mockPacks.data[2].name);
    });

    it('outputs the cycle code', () => {
        const output = process(mockPacks, mockCycles);

        expect(output[0].code).toEqual(mockCycles.data[0].code);
        expect(output[1].code).toEqual(mockCycles.data[1].code);
        expect(output[2].code).toEqual(mockCycles.data[2].code);
        expect(output[3].code).toEqual(mockCycles.data[3].code);
    });

    it('outputs the pack code', () => {
        const output = process(mockPacks, mockCycles);

        expect(output[0].items[0].code).toEqual(mockPacks.data[0].code);
        expect(output[1].items[0].code).toEqual(mockPacks.data[1].code);
        expect(output[1].items[1].code).toEqual(mockPacks.data[2].code);
        expect(output[1].items[2].code).toEqual(mockPacks.data[3].code);
    });

    it('does not output fan-made packs', () => {
        const output = process(mockPacks, mockCycles);
        const cycle = output.find((cycle) => cycle.code === 'magnum-opus');

        expect(cycle).toBeFalsy();
    });

    it('does not output draft packs', () => {
        const output = process(mockPacks, mockCycles);
        const cycle = output.find((cycle) => cycle.code === 'draft');

        expect(cycle).toBeFalsy();
    });
})
