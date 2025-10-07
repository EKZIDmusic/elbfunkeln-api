"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReviewDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_review_dto_1 = require("./create-review.dto");
const mapped_types_2 = require("@nestjs/mapped-types");
class UpdateReviewDto extends (0, mapped_types_1.PartialType)((0, mapped_types_2.OmitType)(create_review_dto_1.CreateReviewDto, ['productId'])) {
}
exports.UpdateReviewDto = UpdateReviewDto;
//# sourceMappingURL=update-review.dto.js.map