'use strict';

const productInfo = require('../../product-info/routes/product-info');



const { createCoreController } = require('@strapi/strapi').factories;
module.exports = createCoreController('api::product.product', ({ strapi }) => ({
    async find(ctx) {
        const entry = await strapi.db.query('api::product.product').findMany({
            select: ['code', 'stock'],
            populate: { productInfo : true},
          });

      return entry;
    },
  }));

