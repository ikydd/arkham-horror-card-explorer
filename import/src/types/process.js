const process = ({ data: types }) => types
    .filter(({ is_subtype }) => !is_subtype)
    .map(({ name, code, side_code }) => ({
        code,
        name,
        side: side_code
    }));

module.exports = process
