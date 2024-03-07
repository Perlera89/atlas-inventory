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
        const populateValues = populateParam.split(','); // separacion para las tablas padres
        populateValues.forEach(value => {
          const [tableName, fields] = value.split(':'); // separador de NbTabla y atributos padres
          const [select, populte] = fields.split('.') // identificador de tablas hijas
          //console.log('select', populate)
          let populate = {}
          if(populte){
            const anidationpopulate = populte.split('/') // separador de tablas hijas
            console.log('anidationpopulate', anidationpopulate)
            anidationpopulate.forEach(value => { 
              const [tableAnidate, select2] = value.split(';') //separador de NbTablashijas y sus atributos
              console.log('tableAnidate,select', tableAnidate,select2)
              const selects = select2.split('-') // separador de atributos tanto como padres e hijos
              console.log('selects', selects)
              populate[tableAnidate] = {select : selects}
              population[tableName] = { select: select.split('-'), populate };
            })
          }
          else{
          population[tableName] = { select: select.split('-')};
          
          }
          // http://localhost:1337/api/product-sales?select=amount&populate=product:code-stock.product_info;name-thumbnail,sale:code-discount.client;DUI-tel/credential;user_name    ejemplo de url solo para el populate no para el select 
        });
      }
    }

  
    console.log('population', population)
    const entry = await strapi.db.query(table).findMany({
      select: selectedAttributes,
      populate: population
    })
    return entry;
}}