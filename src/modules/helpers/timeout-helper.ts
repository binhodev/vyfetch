export function createTimeoutSignal(timeout: number): {
    signal: AbortSignal;
    cancel: () => void;
} {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    return {
        signal: controller.signal,
        cancel: () => clearTimeout(timer),
    };
}
