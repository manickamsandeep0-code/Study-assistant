
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const API_KEY = process.env.API_KEY;

if (!GOOGLE_CLIENT_ID) {
    // This is a non-critical warning. The app can function without authentication.
    console.warn("Google Client ID not found. User authentication will be disabled.");
}

if (!API_KEY) {
    // This is critical for the app's core functionality.
    throw new Error("API_KEY environment variable not set. The application cannot function.");
}
