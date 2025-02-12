interface CacheEntry<T> {
    data: T;
    expiresAt: number;
    revalidateAt: number;
}

export class CacheVyManager<T = any> {
    private cache = new Map<string, CacheEntry<T>>();

    public get(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (entry && entry.expiresAt > Date.now()) {
            return entry.data;
        }
        this.cache.delete(key);

        return undefined;
    }

    public set(
        key: string,
        data: T,
        ttl: number,
        staleWhileRevalidate?: boolean
    ): void {
        const expiresAt = Date.now() + ttl;
        const revalidateAt = staleWhileRevalidate
            ? Date.now() + ttl / 2
            : expiresAt;
        this.cache.set(key, { data: data, expiresAt, revalidateAt });
    }

    public invalidate(key: string): void {
        this.cache.delete(key);
    }

    public getWithRevalidate(
        key: string,
        revalidateFn: () => Promise<T>
    ): T | undefined {
        const entry = this.cache.get(key);
        if (entry) {
            if (entry.revalidateAt < Date.now()) {
                revalidateFn().then((data) =>
                    this.set(key, data, entry.expiresAt - Date.now(), true)
                );
            }
            if (entry.expiresAt > Date.now()) {
                return entry.data;
            }
            this.cache.delete(key);
        }
        return undefined;
    }
}
