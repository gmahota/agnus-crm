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
const customer_1 = __importDefault(require("../base/customer"));
const accountExecutive_1 = __importDefault(require("./accountExecutive"));
const channel_1 = __importDefault(require("./channel"));
const leadLine_1 = __importDefault(require("./leadLine"));
let Lead = class Lead {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Lead.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "street1", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "street2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "province", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Lead.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Lead.prototype, "isQualified", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Lead.prototype, "isConverted", void 0);
__decorate([
    typeorm_1.ManyToOne(() => channel_1.default, (item) => item.leads),
    typeorm_1.JoinColumn({ name: "channelID" }),
    __metadata("design:type", channel_1.default)
], Lead.prototype, "channel", void 0);
__decorate([
    typeorm_1.ManyToOne(() => customer_1.default, (item) => item.leads),
    typeorm_1.JoinColumn({ name: "customerID" }),
    __metadata("design:type", customer_1.default)
], Lead.prototype, "customer", void 0);
__decorate([
    typeorm_1.ManyToOne(() => accountExecutive_1.default, (item) => item.leads),
    typeorm_1.JoinColumn({ name: "accountExecutiveID" }),
    __metadata("design:type", accountExecutive_1.default)
], Lead.prototype, "accountExecutive", void 0);
__decorate([
    typeorm_1.OneToMany(() => leadLine_1.default, item => item.lead, {
        cascade: ['insert', 'update']
    }),
    __metadata("design:type", Array)
], Lead.prototype, "leadlines", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Lead.prototype, "createdAt", void 0);
Lead = __decorate([
    typeorm_1.Entity('lead')
], Lead);
exports.default = Lead;
