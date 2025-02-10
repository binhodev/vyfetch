export class BatchVyManager {
    private pendingRequests = new Map<string, Promise<any>>();

    public get(key: string): Promise<any> | undefined {
        return this.pendingRequests.get(key);
    }

    public set(key: string, promise: Promise<any>): void {
        this.pendingRequests.set(key, promise);

        promise.finally(() => this.pendingRequests.delete(key));
    }
}
