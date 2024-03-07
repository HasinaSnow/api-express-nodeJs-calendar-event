"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUpdateValidator = exports.EventValidator = void 0;
const class_validator_1 = require("class-validator");
const exists_validator_1 = require("../../utils/validators/exists.validator");
const default_collection_name_1 = require("../../data/default-collection-name");
class EventValidator {
    // @IsString()
    // @IsArray()
    // @IsNotEmpty({ message: 'The service id is required.'})
    // @ExistIn(COLLECTION.service, { message: 'One of id service is invalid'})
    // serviceRefs: string[]
    init(model) {
        this.date = model.date;
        this.infos = model.infos || '';
        this.categId = model.categId;
        // this.serviceRefs = model.serviceRefs
        return { date: new Date(this.date), infos: this.infos, categId: this.categId };
    }
}
exports.EventValidator = EventValidator;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)()
], EventValidator.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255)
], EventValidator.prototype, "infos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, exists_validator_1.ExistIn)(default_collection_name_1.COLLECTION.categ, { message: 'The specified category is not found' })
], EventValidator.prototype, "categId", void 0);
class EventUpdateValidator {
    // @IsString()
    // @IsArray()
    // @IsNotEmpty({ message: 'The service id is required.'})
    // @IsOptional()
    // @ExistIn(COLLECTION.service, { message: 'One of id service is invalid'})
    // serviceRefs?: string[]
    init(model) {
        this.date = model.date;
        this.infos = model.infos;
        this.categId = model.categId;
        // this.serviceRefs = model.serviceRefs
        const m = { date: this.date ? new Date(this.date) : undefined, infos: this.infos, categId: this.categId };
        return Object.keys(m)
            .reduce((result, key) => {
            if (m[key] !== undefined) {
                result[key] = m[key];
            }
            return result;
        }, {});
    }
}
exports.EventUpdateValidator = EventUpdateValidator;
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)()
], EventUpdateValidator.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)()
], EventUpdateValidator.prototype, "infos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, exists_validator_1.ExistIn)('categs', { message: 'The specified category is not found' }),
    (0, class_validator_1.IsOptional)()
], EventUpdateValidator.prototype, "categId", void 0);
