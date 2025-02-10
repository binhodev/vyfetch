interface CacheEntry<T> {
    data: T;
    expiresAt: number;
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

    public set(key: string, data: T, ttl: number): void {
        const expiresAt = Date.now() + ttl;
        this.cache.set(key, { data: data, expiresAt });
    }

    public invalidate(key: string): void {
        this.cache.delete(key);
    }
}
