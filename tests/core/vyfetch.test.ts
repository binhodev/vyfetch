import { describe, it, expect } from "vitest";
import { vyfetch } from "../../src/core/vyfetch";

describe("vyfetch", () => {
    it("should be defined", () => {
        expect(vyfetch).toBeDefined();
    });
});
