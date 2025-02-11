import { describe, it, expect } from "vitest";
import { createTimeoutSignal } from "../../../src/modules/helpers/timeout-helper";

describe("createTimeoutSignal", () => {
    it("should be defined", () => {
        expect(createTimeoutSignal).toBeDefined();
    });
});
