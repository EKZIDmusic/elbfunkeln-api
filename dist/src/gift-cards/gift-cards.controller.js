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
exports.GiftCardsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const gift_cards_service_1 = require("./gift-cards.service");
const create_gift_card_dto_1 = require("./dto/create-gift-card.dto");
const update_gift_card_dto_1 = require("./dto/update-gift-card.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let GiftCardsController = class GiftCardsController {
    giftCardsService;
    constructor(giftCardsService) {
        this.giftCardsService = giftCardsService;
    }
    create(user, createGiftCardDto) {
        return this.giftCardsService.create(createGiftCardDto);
    }
    findAll() {
        return this.giftCardsService.findAll();
    }
    findByCode(code) {
        return this.giftCardsService.findByCode(code);
    }
    update(id, updateGiftCardDto) {
        return this.giftCardsService.update(id, updateGiftCardDto);
    }
};
exports.GiftCardsController = GiftCardsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_gift_card_dto_1.CreateGiftCardDto]),
    __metadata("design:returntype", void 0)
], GiftCardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GiftCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GiftCardsController.prototype, "findByCode", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_gift_card_dto_1.UpdateGiftCardDto]),
    __metadata("design:returntype", void 0)
], GiftCardsController.prototype, "update", null);
exports.GiftCardsController = GiftCardsController = __decorate([
    (0, swagger_1.ApiTags)('gift-cards'),
    (0, common_1.Controller)('gift-cards'),
    __metadata("design:paramtypes", [gift_cards_service_1.GiftCardsService])
], GiftCardsController);
//# sourceMappingURL=gift-cards.controller.js.map