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
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../core/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../core/auth/guards/roles.guard");
const roles_decorator_1 = require("../../core/auth/decorators/roles.decorator");
const public_decorator_1 = require("../../core/auth/decorators/public.decorator");
const contact_service_1 = require("./contact.service");
const create_contact_inquiry_dto_1 = require("./dto/create-contact-inquiry.dto");
const update_contact_inquiry_dto_1 = require("./dto/update-contact-inquiry.dto");
const contact_query_dto_1 = require("./dto/contact-query.dto");
let ContactController = class ContactController {
    contactService;
    constructor(contactService) {
        this.contactService = contactService;
    }
    createInquiry(createContactInquiryDto) {
        return this.contactService.createInquiry(createContactInquiryDto);
    }
    getInquiries(query) {
        return this.contactService.getInquiries(query);
    }
    getInquiryById(id) {
        return this.contactService.getInquiryById(id);
    }
    updateInquiry(id, updateContactInquiryDto) {
        return this.contactService.updateInquiry(id, updateContactInquiryDto);
    }
    deleteInquiry(id) {
        return this.contactService.deleteInquiry(id);
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create contact inquiry (public endpoint)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Inquiry created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_inquiry_dto_1.CreateContactInquiryDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "createInquiry", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SHOP_OWNER'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all contact inquiries (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inquiries retrieved successfully' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_query_dto_1.ContactQueryDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getInquiries", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SHOP_OWNER'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get contact inquiry by ID (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Inquiry ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inquiry retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inquiry not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "getInquiryById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SHOP_OWNER'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update contact inquiry status (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Inquiry ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inquiry updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inquiry not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_contact_inquiry_dto_1.UpdateContactInquiryDto]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "updateInquiry", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete contact inquiry (admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Inquiry ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Inquiry deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Inquiry not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContactController.prototype, "deleteInquiry", null);
exports.ContactController = ContactController = __decorate([
    (0, swagger_1.ApiTags)('Contact'),
    (0, common_1.Controller)('contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map