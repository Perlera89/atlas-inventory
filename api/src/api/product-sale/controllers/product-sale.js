'use strict';
const { constulCustom } = require('../../../utils/consults')
/**
 * product-sale controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-sale.product-sale', ({ strapi }) => ({
    async find (params) {
      const table = 'api::product-sale.product-sale'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/]
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }}));
