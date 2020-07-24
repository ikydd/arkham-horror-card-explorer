const process = require('./process');

const mockCardsData = require('../../../fixtures/nrdb/cards');
const mockPackData = require('../../../fixtures/api/packs');

describe('process cards', () => {

    it('outputs the correct number of cards', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output.length).toEqual(4);
    });

    it('does not output cards for not included packs', () => {
        const output = process(mockCardsData, mockPackData);
        const cards = output.find((card) => card.title === 'Border Control');

        expect(cards).toBeFalsy();
    });

    it('outputs the titles', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[0].title).toEqual(mockCardsData.data[0].title);
        expect(output[1].title).toEqual(mockCardsData.data[1].title);
        expect(output[2].title).toEqual(mockCardsData.data[2].title);
    });

    it('adds an image URL to each card using the template', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[0].imagesrc).toEqual(mockCardsData.imageUrlTemplate.replace('{code}', mockCardsData.data[0].code));
        expect(output[1].imagesrc).toEqual(mockCardsData.imageUrlTemplate.replace('{code}', mockCardsData.data[1].code));
    });

    it('uses a specified image if present', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[2].imagesrc).toEqual(mockCardsData.data[2].image_url);
    });

    it('outputs the side', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[2].side).toEqual(mockCardsData.data[2].side_code);
        expect(output[3].side).toEqual(mockCardsData.data[3].side_code);
    });

    it('outputs the card code', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[0].code).toEqual(mockCardsData.data[0].code);
        expect(output[1].code).toEqual(mockCardsData.data[1].code);
        expect(output[2].code).toEqual(mockCardsData.data[2].code);
        expect(output[3].code).toEqual(mockCardsData.data[3].code);
    });

    it('outputs the faction code', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[0].faction).toEqual(mockCardsData.data[0].faction_code);
        expect(output[1].faction).toEqual(mockCardsData.data[1].faction_code);
        expect(output[2].faction).toEqual(mockCardsData.data[2].faction_code);
        expect(output[3].faction).toEqual(mockCardsData.data[3].faction_code);
    });

    it('outputs the type code', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[0].type).toEqual(mockCardsData.data[0].type_code);
        expect(output[1].type).toEqual(mockCardsData.data[1].type_code);
        expect(output[2].type).toEqual(mockCardsData.data[2].type_code);
        expect(output[3].type).toEqual(mockCardsData.data[3].type_code);
    });

    it('outputs the pack code', () => {
        const output = process(mockCardsData, mockPackData);

        expect(output[0].pack).toEqual(mockCardsData.data[0].pack_code);
        expect(output[1].pack).toEqual(mockCardsData.data[1].pack_code);
        expect(output[2].pack).toEqual(mockCardsData.data[2].pack_code);
        expect(output[3].pack).toEqual(mockCardsData.data[3].pack_code);
    });
})
