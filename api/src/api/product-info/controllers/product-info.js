'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * product-info controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-info.product-info', ({ strapi }) => ({
    async find (params) {
      const table = 'api::product-info.product-info'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
