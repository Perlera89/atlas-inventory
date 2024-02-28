'use strict';

/**
 * product-sale service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-sale.product-sale');
