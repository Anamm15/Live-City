/**
 * @interface BaseResponse
 * Interface dasar untuk semua respons API.
 */
export interface BaseResponse {
    status: boolean;
    message?: string;
    // Anda bisa menambahkan properti umum lainnya di sini,
    // seperti timestamp atau correlationId
}

/**
 * @interface SuccessResponse
 * Interface untuk respons API yang sukses.
 * @extends BaseResponse
 * @template T - Tipe data yang dikembalikan dalam respons.
 */
export interface SuccessResponse<T> extends BaseResponse {
    data: T;
}

/**
 * @interface ErrorResponse
 * Interface untuk respons API yang gagal (error).
 * @extends BaseResponse
 */
export interface ErrorResponse extends BaseResponse {
    error: string;
    // Anda bisa menambahkan properti error spesifik di sini,
    // seperti errorCode, validationErrors, atau stackTrace (hindari di production)
}

/**
 * Membangun objek respons sukses untuk API.
 *
 * @template T Tipe data yang akan dikembalikan.
 * @param {T} data Data yang ingin dikembalikan.
 * @param {string} [message="Operation successful."] Pesan opsional untuk respons sukses.
 * @returns {SuccessResponse<T>} Objek respons sukses.
 */
export function buildResponseSuccess<T>(data: T, message: string = "Operation successful."): SuccessResponse<T> {
    return {
        status: true,
        message: message,
        data: data,
    };
}

/**
 * Membangun objek respons error untuk API.
 *
 * @param {string} error Pesan error yang menjelaskan masalah.
 * @param {string} [message="Operation failed."] Pesan opsional untuk respons error.
 * @returns {ErrorResponse} Objek respons error.
 */
export function buildResponseError(error: string, message: string = "Operation failed."): ErrorResponse {
    return {
        status: false,
        message: message, // Pesan umum untuk user
        error: error,     // Detail error untuk developer atau logging
    };
}

// --- Contoh Penggunaan (untuk pemahaman, tidak perlu diimport di kode produksi) ---
/*
// Contoh 1: Respons Sukses dengan Data Genre Tunggal
interface GenreDto {
    id: number;
    nama: string;
}

const singleGenre: GenreDto = { id: 1, nama: "Action" };
const successResponseSingle = buildResponseSuccess(singleGenre, "Genre retrieved successfully.");
console.log("Success Response (Single):", successResponseSingle);
// Output: { status: true, message: 'Genre retrieved successfully.', data: { id: 1, nama: 'Action' } }

// Contoh 2: Respons Sukses dengan Array Genre
const multipleGenres: GenreDto[] = [
    { id: 1, nama: "Action" },
    { id: 2, nama: "Comedy" }
];
const successResponseArray = buildResponseSuccess(multipleGenres); // Menggunakan pesan default
console.log("Success Response (Array):", successResponseArray);
// Output: { status: true, message: 'Operation successful.', data: [ { id: 1, nama: 'Action' }, { id: 2, nama: 'Comedy' } ] }


// Contoh 3: Respons Error
const errorDetails = "Database connection failed.";
const errorResponse = buildResponseError(errorDetails, "Failed to load data.");
console.log("Error Response:", errorResponse);
// Output: { status: false, message: 'Failed to load data.', error: 'Database connection failed.' }

// Contoh 4: Respons Error dengan pesan default
const anotherErrorDetails = "Invalid input provided.";
const anotherErrorResponse = buildResponseError(anotherErrorDetails);
console.log("Another Error Response:", anotherErrorResponse);
// Output: { status: false, message: 'Operation failed.', error: 'Invalid input provided.' }
*/