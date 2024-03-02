'use strict'

const { constulCustom } = require('../../../hooks/consults')
const { createCoreController } = require('@strapi/strapi').factories
// @ts-ignore
module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find (params) {
    const table = 'api::product.product'
    let attributes = ['code', 'stock', 'sale_price']; 
    const populate = {product_info: { select: ['id', 'name'] }}
    /*if (params.request.url.includes('select')) {
      const selectParam = new URLSearchParams(params.request.url.split('?')[1]).get('select');
      if (selectParam) {
        selectedAttributes = selectParam.split(',');
      }
    }
    console.log('Atributos seleccionados:', selectedAttributes);
    const entry = await strapi.db.query('api::product.product').findMany({
      select: selectedAttributes,
      populate: { product_info: { select: ['id', 'name', 'thumbnail'] } }
    })*/

    return constulCustom(params,attributes,table,populate)
  },
  async findOne () {
    const entry = await strapi.db.query('api::product.product').findOne({
      select: ['thumbnail', 'code', 'stock', 'sale_price'],
      populate: { product_info: { select: ['id', 'name'] } }
    })

    return entry
  }

}))
