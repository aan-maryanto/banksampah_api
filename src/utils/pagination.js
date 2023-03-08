const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: datas } = data
    const currentPage = page ? +page : 1
    const totalPage = Math.ceil(totalItems / limit)

    return {totalItems, totalPage, currentPage, datas}
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return {limit, offset}
}

module.exports = {
    getPagingData,
    getPagination
}