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
exports.DiscountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const discounts_service_1 = require("./discounts.service");
const create_discount_dto_1 = require("./dto/create-discount.dto");
const update_discount_dto_1 = require("./dto/update-discount.dto");
const validate_discount_dto_1 = require("./dto/validate-discount.dto");
const apply_discount_dto_1 = require("./dto/apply-discount.dto");
const jwt_auth_guard_1 = require("../../core/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../core/auth/guards/roles.guard");
const roles_decorator_1 = require("../../core/auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let DiscountsController = class DiscountsController {
    discountsService;
    constructor(discountsService) {
        this.discountsService = discountsService;
    }
    create(createDiscountDto) {
        return this.discountsService.create(createDiscountDto);
    }
    findAll() {
        return this.discountsService.findAll();
    }
    findByCode(code) {
        return this.discountsService.findByCode(code);
    }
    update(id, updateDiscountDto) {
        return this.discountsService.update(id, updateDiscountDto);
    }
    remove(id) {
        return this.discountsService.remove(id);
    }
    validate(validateDiscountDto) {
        return this.discountsService.validateDiscount(validateDiscountDto);
    }
    apply(applyDiscountDto) {
        return this.discountsService.applyToOrder(applyDiscountDto);
    }
};
exports.DiscountsController = DiscountsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_discount_dto_1.CreateDiscountDto]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_discount_dto_1.UpdateDiscountDto]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_discount_dto_1.ValidateDiscountDto]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)('apply'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_discount_dto_1.ApplyDiscountDto]),
    __metadata("design:returntype", void 0)
], DiscountsController.prototype, "apply", null);
exports.DiscountsController = DiscountsController = __decorate([
    (0, swagger_1.ApiTags)('discounts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('discounts'),
    __metadata("design:paramtypes", [discounts_service_1.DiscountsService])
], DiscountsController);
//# sourceMappingURL=discounts.controller.js.map