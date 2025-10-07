"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../core/auth/guards/roles.guard");
const roles_decorator_1 = require("../../../core/auth/decorators/roles.decorator");
const admin_analytics_service_1 = require("./admin-analytics.service");
const date_range_query_dto_1 = require("./dto/date-range-query.dto");
let AdminAnalyticsController = class AdminAnalyticsController {
    adminAnalyticsService;
    constructor(adminAnalyticsService) {
        this.adminAnalyticsService = adminAnalyticsService;
    }
    getStats() {
        return this.adminAnalyticsService.getDashboardStats();
    }
    getDashboardStats() {
        return this.adminAnalyticsService.getDashboardStats();
    }
    getSalesData(query) {
        return this.adminAnalyticsService.getSalesData(query);
    }
    getCustomerInsights(query) {
        return this.adminAnalyticsService.getCustomerInsights(query);
    }
    getProductPerformance(query) {
        return this.adminAnalyticsService.getProductPerformance(query);
    }
    getOrderStatistics(query) {
        return this.adminAnalyticsService.getOrderStatistics(query);
    }
};
exports.AdminAnalyticsController = AdminAnalyticsController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard statistics (alias for /dashboard)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard stats retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminAnalyticsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get dashboard statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dashboard stats retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminAnalyticsController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('sales'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sales data with date range filter' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sales data retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_query_dto_1.DateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], AdminAnalyticsController.prototype, "getSalesData", null);
__decorate([
    (0, common_1.Get)('customers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get customer insights' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Customer insights retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_query_dto_1.DateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], AdminAnalyticsController.prototype, "getCustomerInsights", null);
__decorate([
    (0, common_1.Get)('products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get product performance data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Product performance retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_query_dto_1.DateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], AdminAnalyticsController.prototype, "getProductPerformance", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get order statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Order statistics retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Requires ADMIN or SHOP_OWNER role' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_range_query_dto_1.DateRangeQueryDto]),
    __metadata("design:returntype", void 0)
], AdminAnalyticsController.prototype, "getOrderStatistics", null);
exports.AdminAnalyticsController = AdminAnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('Admin - Analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin/analytics'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SHOP_OWNER'),
    __metadata("design:paramtypes", [admin_analytics_service_1.AdminAnalyticsService])
], AdminAnalyticsController);
//# sourceMappingURL=admin-analytics.controller.js.map