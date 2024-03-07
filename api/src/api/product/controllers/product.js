'use strict'

const { constulCustom, constulCustomOne } = require('../../../utils/consults')
const { createCoreController } = require('@strapi/strapi').factories
// @ts-ignore
module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async find (params) {
    const table = 'api::product.product'
    let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
  const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select}}}*/}
    return constulCustom(params,attributes,table,populate)
  },
  async findOne (params) {
    const table = 'api::product.product'
    let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
    const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select}}}*/}
    console.log('params', params.URL.pathname.split('/')[3])
    return constulCustomOne(params,attributes,table,populate)
  }

}))
