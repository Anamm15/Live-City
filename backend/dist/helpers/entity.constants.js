"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileableType = exports.PollsStatus = exports.PollsType = exports.SubmissionStatus = exports.SubmissionCategory = exports.ReportStatus = exports.ReportCategory = exports.Occupation = exports.Education = exports.Role = exports.MaritalStatus = exports.Religion = exports.Gender = exports.EconomicStatus = void 0;
exports.EconomicStatus = [
    "LOWER",
    "LOWER_MIDDLE",
    "MIDDLE",
    "UPPER_MIDDLE",
    "UPPER",
    "UNKNOWN",
];
exports.Gender = ["MALE", "FEMALE"];
exports.Religion = [
    "ISLAM",
    "CHRISTIAN",
    "CATHOLIC",
    "HINDU",
    "BUDDHIST",
    "CONFUCIAN",
    "JUDAISM",
];
exports.MaritalStatus = [
    "NEVER_MARRIED",
    "MARRIED",
    "DIVORCED",
    "WIDOWED",
];
exports.Role = ["ADMIN", "USER"];
exports.Education = [
    "NO_SCHOOLING",
    "ELEMENTARY",
    "MIDDLE_SCHOOL",
    "HIGH_SCHOOL",
    "DIPLOMA_3",
    "DIPLOMA_4",
    "BACHELOR",
    "MASTER",
    "DOCTORATE",
];
exports.Occupation = [
    "ENTREPRENEUR",
    "UNEMPLOYED",
    "EMPLOYED",
    "STUDENT",
    "RETIRED",
    "OTHER",
];
exports.ReportCategory = [
    "CLEANLINESS",
    "SECURITY",
    "INFRASTRUCTURE",
    "PUBLIC_SERVICE",
    "ENVIRONMENT",
    "SOCIAL",
    "EDUCATION",
    "HEALTH",
    "TRANSPORTATION",
    "HOUSING",
    "OTHER",
];
exports.ReportStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];
exports.SubmissionCategory = [
    "ID_CARD",
    "FAMILY_CARD",
    "POLICE_CLEARANCE",
    "BUSINESS_CERTIFICATE",
    "DOMICILE_CERTIFICATE",
    "POVERTY_CERTIFICATE",
    "EVENT_PERMIT",
    "MICRO_BUSINESS_LICENSE",
    "INHERITANCE_CERTIFICATE",
    "HEIR_CERTIFICATE",
    "DEATH_CERTIFICATE",
    "BIRTH_CERTIFICATE",
    "MARRIAGE_CERTIFICATE",
    "DIVORCE_CERTIFICATE",
    "COVER_LETTER",
];
exports.SubmissionStatus = [
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "REJECTED",
];
exports.PollsType = ["VOTING", "SURVEY"];
exports.PollsStatus = ["ACTIVE", "CLOSED"];
exports.FileableType = [
    "VILLAGE",
    "FACILITY",
    "COMMUNITY",
    "NEWS",
    "SUBMISSION",
    "REPORT",
    "USER",
];
