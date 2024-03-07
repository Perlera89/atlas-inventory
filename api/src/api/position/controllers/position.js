'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * position controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::position.position', ({ strapi }) => ({
    async find (params) {
      const table = 'api::position.position'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
