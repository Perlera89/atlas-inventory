module.exports = {
    async constulCustom(params, attributsDefault, table,populate){
    let selectedAttributes = attributsDefault;
    let population = populate
    if (params.request.url.includes('select')) {
      const selectParam = new URLSearchParams(params.request.url.split('?')[1]).get('select');
      if (selectParam) {
        selectedAttributes = selectParam.split(',');
      }
    }
    if (params.request.url.includes('populate')) {
      const populateParam = new URLSearchParams(params.request.url.split('?')[1]).get('populate');
      if (populateParam) {
        const populateValues = populateParam.split(',');
        populateValues.forEach(value => {
          const [tableName, fields] = value.split(':');
          population[tableName] = { select: fields.split('-') };
        });
      }
    }
    const entry = await strapi.db.query(table).findMany({
      select: selectedAttributes,
      populate: population
    })
    return entry;
}}
