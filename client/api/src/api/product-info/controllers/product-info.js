'use strict';

/**
 * product-info controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-info.product-info',({ strapi }) => ({
    async find() {
        const entry = await strapi.db.query('api::product-info.product-info').findMany({
            select: ['name','is_deleted'],
            populate: {category : {select:['name']}}
          });

      return entry;
    },
    
    
  }));
