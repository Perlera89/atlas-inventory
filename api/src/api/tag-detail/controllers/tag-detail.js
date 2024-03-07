'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * tag-detail controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::tag-detail.tag-detail', ({ strapi }) => ({
    async find (params) {
      const table = 'api::tag-detail.tag-detail'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
