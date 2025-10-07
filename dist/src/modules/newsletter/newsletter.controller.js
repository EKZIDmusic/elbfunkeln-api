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
exports.NewsletterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const newsletter_service_1 = require("./newsletter.service");
const subscribe_dto_1 = require("./dto/subscribe.dto");
const jwt_auth_guard_1 = require("../../core/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../core/auth/guards/roles.guard");
const roles_decorator_1 = require("../../core/auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const public_decorator_1 = require("../../core/auth/decorators/public.decorator");
let NewsletterController = class NewsletterController {
    newsletterService;
    constructor(newsletterService) {
        this.newsletterService = newsletterService;
    }
    subscribe(subscribeDto) {
        return this.newsletterService.subscribe(subscribeDto);
    }
    findAll() {
        return this.newsletterService.findAll();
    }
    unsubscribe(email) {
        return this.newsletterService.unsubscribe(email);
    }
};
exports.NewsletterController = NewsletterController;
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscribe_dto_1.SubscribeDto]),
    __metadata("design:returntype", void 0)
], NewsletterController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NewsletterController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':email'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsletterController.prototype, "unsubscribe", null);
exports.NewsletterController = NewsletterController = __decorate([
    (0, swagger_1.ApiTags)('newsletter'),
    (0, common_1.Controller)('newsletter'),
    __metadata("design:paramtypes", [newsletter_service_1.NewsletterService])
], NewsletterController);
//# sourceMappingURL=newsletter.controller.js.map