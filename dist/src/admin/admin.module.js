"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const contact_module_1 = require("../contact/contact.module");
const products_module_1 = require("../products/products.module");
const admin_users_controller_1 = require("./users/admin-users.controller");
const admin_users_service_1 = require("./users/admin-users.service");
const admin_analytics_controller_1 = require("./analytics/admin-analytics.controller");
const admin_analytics_service_1 = require("./analytics/admin-analytics.service");
const admin_contact_controller_1 = require("./contact/admin-contact.controller");
const admin_products_controller_1 = require("./products/admin-products.controller");
const admin_products_service_1 = require("./products/admin-products.service");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, contact_module_1.ContactModule, products_module_1.ProductsModule],
        controllers: [admin_users_controller_1.AdminUsersController, admin_analytics_controller_1.AdminAnalyticsController, admin_contact_controller_1.AdminContactController, admin_products_controller_1.AdminProductsController],
        providers: [admin_users_service_1.AdminUsersService, admin_analytics_service_1.AdminAnalyticsService, admin_products_service_1.AdminProductsService],
        exports: [admin_users_service_1.AdminUsersService, admin_analytics_service_1.AdminAnalyticsService, admin_products_service_1.AdminProductsService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map