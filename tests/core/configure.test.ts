import { describe, it, expect } from "vitest";
import { configure } from "../../src/core/configure";

describe("configure", () => {
    it("should be defined", () => {
        expect(configure).toBeDefined();
    });
});
