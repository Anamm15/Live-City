export enum CommonMessage {
   INVALID_CREDENTIALS = "Invalid credentials",
   INVALID_REQUEST_DATA = "Invalid request data",
   FILE_UPLOADED = "File uploaded successfully",
   FILE_DELETED = "File deleted successfully",
   FILE_NOT_FOUND = "File not found",
   FILE_UPLOAD_FAILED = "Failed to upload file",
   TOKEN_REFRESHED = "Token refreshed successfully",
   TOKEN_REFRESH_FAILED = "Token refresh failed",
   TOKEN_NOT_FOUND = "Token not found",
}

export enum UserMessage {
   USERS_RETRIEVED = "User retrieved successfully",
   USER_RETRIEVED = "User retrieved successfully",
   USER_CREATED = "User created successfully",
   USER_UPDATED = "User updated successfully",
   USER_DELETED = "User deleted successfully",
   USER_ALREADY_EXISTS = "User already exists",
   USER_RETRIEVE_FAILED = "Failed to retrieve user",
   USER_CREATE_FAILED = "Failed to create user",
   USER_UPDATE_FAILED = "Failed to update user",
   USER_DELETE_FAILED = "Failed to delete user",
   USER_NOT_FOUND = "User not found",
   USER_LOGIN_SUCCESSFUL = "User login successful",
   USER_LOGIN_FAILED = "Failed to login",
   USER_LOGOUT_SUCCESSFUL = "User logout successful",
   USER_LOGOUT_FAILED = "Failed to logout",
   USER_PASSWORD_CHANGED = "User password changed successfully",
}

export enum SubmissionMessage {
   SUBMISSION_RETRIEVED = "Submission retrieved successfully",
   SUBMISSION_CREATED = "Submission created successfully",
   SUBMISSION_UPDATED = "Submission updated successfully",
   SUBMISSION_STATUS_UPDATED = "Submission status updated successfully",
   SUBMISSION_RETRIEVE_FAILED = "Failed to retrieve submission",
   SUBMISSION_CREATE_FAILED = "Failed to create submission",
   SUBMISSION_UPDATE_FAILED = "Failed to update submission",
   SUBMISSION_STATUS_UPDATE_FAILED = "Failed to update submission status",
   SUBMISSION_DELETE_FAILED = "Failed to delete submission",
   SUBMISSION_NOT_FOUND = "Submission not found",
}

export enum ReportMessage {
   REPORT_RETRIEVED = "Report retrieved successfully",
   REPORT_CREATED = "Report created successfully",
   REPORT_UPDATED = "Report updated successfully",
   REPORT_RESPONSE_UPDATED = "Report response updated successfully",
   REPORT_RETRIEVE_FAILED = "Failed to retrieve report",
   REPORT_CREATE_FAILED = "Failed to create report",
   REPORT_UPDATE_FAILED = "Failed to update report",
   REPORT_RESPONSE_UPDATE_FAILED = "Failed to update report response",
   REPORT_DELETE_FAILED = "Failed to delete report",
   REPORT_NOT_FOUND = "Report not found",
}

export enum NewsMessage {
   NEWS_RETRIEVED = "News retrieved successfully",
   NEWS_CREATED = "News created successfully",
   NEWS_UPDATED = "News updated successfully",
   NEWS_DELETED = "News deleted successfully",
   NEWS_RETRIEVE_FAILED = "Failed to retrieve news",
   NEWS_CREATE_FAILED = "Failed to create news",
   NEWS_UPDATE_FAILED = "Failed to update news",
   NEWS_DELETE_FAILED = "Failed to delete news",
   NEWS_NOT_FOUND = "News not found",
   NEWS_COMMENT_RETRIEVED = "News comments retrieved successfully",
   NEWS_COMMENT_CREATED = "News comment created successfully",
   NEWS_COMMENT_DELETED = "News comment deleted successfully",
   NEWS_COMMENT_RETRIEVE_FAILED = "Failed to retrieve news comment",
   NEWS_COMMENT_CREATE_FAILED = "Failed to create news comment",
   NEWS_COMMENT_DELETE_FAILED = "Failed to delete news comment",
   NEWS_COMMENT_NOT_FOUND = "News comment not found",
   NEWS_REACTION_RETRIEVED = "News reactions retrieved successfully",
   NEWS_REACTION_CREATED = "News reaction created successfully",
   NEWS_REACTION_RETRIEVE_FAILED = "Failed to retrieve news reaction",
   NEWS_REACTION_CREATE_FAILED = "Failed to create news reaction",
   NEWS_REACTION_NOT_FOUND = "News reaction not found",
}

export enum FamilyMessage {
   FAMILY_RETRIEVED = "Family retrieved successfully",
   FAMILY_CREATED = "Family created successfully",
   FAMILY_UPDATED = "Family updated successfully",
   FAMILY_DELETED = "Family deleted successfully",
   FAMILY_RETRIEVE_FAILED = "Failed to retrieve family",
   FAMILY_CREATE_FAILED = "Failed to create family",
   FAMILY_UPDATE_FAILED = "Failed to update family",
   FAMILY_DELETE_FAILED = "Failed to delete family",
   FAMILY_NOT_FOUND = "Family not found",
}

export enum FacilityMessage {
   FACILITY_RETRIEVED = "Facility retrieved successfully",
   FACILITY_CREATED = "Facility created successfully",
   FACILITY_UPDATED = "Facility updated successfully",
   FACILITY_DELETED = "Facility deleted successfully",
   FACILITY_RETRIEVE_FAILED = "Failed to retrieve facility",
   FACILITY_CREATE_FAILED = "Failed to create facility",
   FACILITY_UPDATE_FAILED = "Failed to update facility",
   FACILITY_DELETE_FAILED = "Failed to delete facility",
   FACILITY_NOT_FOUND = "Facility not found",
}
