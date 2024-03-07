'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * sale-point controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sale-point.sale-point', ({ strapi }) => ({
    async find (params) {
      const table = 'api::sale-point.sale-point'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
