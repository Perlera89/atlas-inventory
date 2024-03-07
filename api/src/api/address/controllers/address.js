'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * address controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::address.address', ({ strapi }) => ({
    async find (params) {
      const table = 'api::address.address'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
