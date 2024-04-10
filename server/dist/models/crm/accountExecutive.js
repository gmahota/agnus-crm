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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const lead_1 = __importDefault(require("./lead"));
const opportunity_1 = __importDefault(require("./opportunity"));
let AccountExecutive = class AccountExecutive {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "street1", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "street2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "province", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AccountExecutive.prototype, "systemUserID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], AccountExecutive.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => lead_1.default, item => item.accountExecutive, {
        cascade: ['insert', 'update']
    }),
    __metadata("design:type", Array)
], AccountExecutive.prototype, "leads", void 0);
__decorate([
    typeorm_1.OneToMany(() => opportunity_1.default, item => item.accountExecutive, {
        cascade: ['insert', 'update']
    }),
    __metadata("design:type", Array)
], AccountExecutive.prototype, "opportunities", void 0);
AccountExecutive = __decorate([
    typeorm_1.Entity('accountExecutive')
], AccountExecutive);
exports.default = AccountExecutive;
