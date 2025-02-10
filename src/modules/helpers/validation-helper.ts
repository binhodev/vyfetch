export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

export function isValidHeaders(headers: HeadersInit | undefined): boolean {
    if (!headers) return true;
    try {
        new Headers(headers);
        return true;
    } catch (e) {
        return false;
    }
}
