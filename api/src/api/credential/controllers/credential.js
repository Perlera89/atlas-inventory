'use strict';

const { constulCustom } = require('../../../utils/consults');

/**
 * credential controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::credential.credential', ({ strapi }) => ({
    async find (params) {
      const table = 'api::credential.credential'
      let attributes = [/*'code', 'stock', 'sale_price', 'purshes_price'*/];
      const populate = {/*product_info: { select: ['id', 'name', 'thumbnail'], populate : {brand : {select : ['name']}}}*/}
      return constulCustom(params,attributes,table,populate)
    }
  }));
