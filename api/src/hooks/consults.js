module.exports = { 
    async constulCustom(params, attributsDefault, table,populate){
    let selectedAttributes = attributsDefault; 
    if (params.request.url.includes('select')) {
      const selectParam = new URLSearchParams(params.request.url.split('?')[1]).get('select');
      if (selectParam) {
        selectedAttributes = selectParam.split(',');
      }
    }
    const entry = await strapi.db.query(table).findMany({
      select: selectedAttributes,
      populate: populate 
    })
    return entry;
}}