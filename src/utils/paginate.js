const MAX_LIMIT = 100;

module.exports.getPagination = function (page, size){
    return {
        limit:  size <= MAX_LIMIT ? size : MAX_LIMIT,
        offset:  page * size - size
    };
}

module.exports.mapPaginate  = function (data, page, size ){
    return {
        items: data.rows,
        totalItems: data.count,
        currentPage: page,
        totalPages: Math.ceil(data.count / size)
    }
};