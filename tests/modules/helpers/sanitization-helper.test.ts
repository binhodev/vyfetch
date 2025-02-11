import { describe, it, expect } from "vitest";
import {
    sanitizeUrl,
    sanitizeHeaders,
} from "../../../src/modules/helpers/sanitization-helper";

describe("sanitize", () => {
    it("sanitizeUrl should be defined", () => {
        expect(sanitizeUrl).toBeDefined();
    });
    it("sanitizeHeaders should be defined", () => {
        expect(sanitizeHeaders).toBeDefined();
    });
});
