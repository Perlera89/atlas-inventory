'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * provider controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::provider.provider', ({ strapi }) => ({
    async find (params) {
      const table = 'api::provider.provider'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
