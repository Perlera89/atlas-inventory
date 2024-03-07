'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * city controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::city.city', ({ strapi }) => ({
    async find (params) {
      const table = 'api::city.city'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
