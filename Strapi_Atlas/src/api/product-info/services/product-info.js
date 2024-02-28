'use strict';

/**
 * product-info service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-info.product-info');
