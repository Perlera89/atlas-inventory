'use strict'

const { constulCustom } = require('../../../utils/consults')
const { createCoreController } = require('@strapi/strapi').factories
// @ts-ignore
module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find (params) {
    const table = 'api::product.product'
    let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
    const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
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
