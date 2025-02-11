import { describe, it, expect } from "vitest";
import {
    isValidUrl,
    isValidHeaders,
} from "../../../src/modules/helpers/validation-helper";

describe("validate", () => {
    it("isValidUrl should be defined", () => {
        expect(isValidUrl).toBeDefined();
    });
    it("isValidHeaders should be defined", () => {
        expect(isValidHeaders).toBeDefined();
    });
});
