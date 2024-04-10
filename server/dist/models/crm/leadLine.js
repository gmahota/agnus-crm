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
const activity_1 = __importDefault(require("./activity"));
let LeadLine = class LeadLine {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], LeadLine.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LeadLine.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LeadLine.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LeadLine.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LeadLine.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LeadLine.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => lead_1.default, (item) => item.leadlines),
    typeorm_1.JoinColumn({ name: "leadID" }),
    __metadata("design:type", lead_1.default)
], LeadLine.prototype, "lead", void 0);
__decorate([
    typeorm_1.ManyToOne(() => activity_1.default, (item) => item.leadlines),
    typeorm_1.JoinColumn({ name: "activityID" }),
    __metadata("design:type", activity_1.default)
], LeadLine.prototype, "activity", void 0);
LeadLine = __decorate([
    typeorm_1.Entity('leadline')
], LeadLine);
exports.default = LeadLine;
