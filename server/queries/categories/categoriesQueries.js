function getCategoriesQuery() {
    const query = 'MATCH (n:Category) RETURN n'
    return query
}
  
module.exports = { getCategoriesQuery };