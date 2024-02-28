'use strict';

/**
 * sale-point service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sale-point.sale-point');
