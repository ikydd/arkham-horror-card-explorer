const process = ({ imageUrlTemplate, data: cards }) => {
    return cards.map(({ title, code, image_url, side_code, faction_code }) => ({
        code,
        title,
        imagesrc: image_url || imageUrlTemplate.replace('{code}', code),
        side: side_code,
        faction: faction_code
    }));
}

module.exports = process
