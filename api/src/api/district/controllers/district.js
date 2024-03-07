'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * district controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::district.district', ({ strapi }) => ({
    async find (params) {
      const table = 'api::district.district'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
