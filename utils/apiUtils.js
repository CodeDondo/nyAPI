@param {Object}
@param {String}
@returns {Array}

export const getQueryAttributes = (query, default_attr) => {
    const { attributes } = query
    const valid_attr = attributes ? attributes : default_attr
    return valid_attr.split(',').map(str => str.trim())
}

@param {Object}
@returns {Array}

export const getQueryOrder = query => {
    const { order_key = 'id', order_dir = 'ASC' } = query;
    return [[order_key, order_dir]];
}

@param {Object}
@returns {number}

export const getQueryLimit = query => {
    const { limit } = query
    return Number(limit) || 1000
}