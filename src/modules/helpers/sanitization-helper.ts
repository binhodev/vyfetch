export function sanitizeUrl(url: string): string {
    // Implementação de sanitização de URL
    return url.replace(/[^a-zA-Z0-9-_.~:/?#@!$&'()*+,;=%]/g, "");
}

export function sanitizeHeaders(headers: HeadersInit): HeadersInit {
    // Implementação de sanitização de cabeçalhos
    const sanitizedHeaders: HeadersInit = {};
    if (headers instanceof Headers) {
        headers.forEach((value, key) => {
            sanitizedHeaders[key] = value.replace(
                /[^a-zA-Z0-9-_.~:/?#@!$&'()*+,;=%]/g,
                ""
            );
        });
    } else if (Array.isArray(headers)) {
        headers.forEach(([key, value]) => {
            sanitizedHeaders[key] = value.replace(
                /[^a-zA-Z0-9-_.~:/?#@!$&'()*+,;=%]/g,
                ""
            );
        });
    } else if (typeof headers === "object" && headers !== null) {
        for (const key in headers) {
            if (headers.hasOwnProperty(key) && headers[key] !== null) {
                sanitizedHeaders[key] = headers[key]!.replace(
                    /[^a-zA-Z0-9-_.~:/?#@!$&'()*+,;=%]/g,
                    ""
                );
            }
        }
    }
    return sanitizedHeaders;
}
