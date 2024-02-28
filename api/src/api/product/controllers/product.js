'use strict'

const { createCoreController } = require('@strapi/strapi').factories
// @ts-ignore
module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find () {
    const entry = await strapi.db.query('api::product.product').findMany({
      select: ['code', 'stock', 'sale_price'],
      populate: { product_info: { select: ['id', 'name', 'thumbnail'] } }
    })

    return entry
  },
  async findOne () {
    const entry = await strapi.db.query('api::product.product').findOne({
      select: ['thumbnail', 'code', 'stock', 'sale_price'],
      populate: { product_info: { select: ['id', 'name'] } }
    })

    return entry
  }

}))
