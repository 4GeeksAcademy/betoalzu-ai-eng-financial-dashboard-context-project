import { describe, expect, it } from "vitest";

import { parseFinancialMovements } from "./financial-parser";

describe("parseFinancialMovements", () => {
  it("accepts a valid financial movements payload", () => {
    const payload = [
      {
        create_date: "2024-01-10",
        amount: 1000,
        operation_type: "income",
        category: "sales",
        business_type: "B2B",
      },
    ];

    const parsed = parseFinancialMovements(payload);
    expect(parsed).toEqual(payload);
  });

  it("throws when payload is not an array", () => {
    expect(() => parseFinancialMovements({})).toThrow(
      "Invalid API payload: expected an array of movements",
    );
  });

  it("throws when a movement has invalid enum values", () => {
    const payload = [
      {
        create_date: "2024-01-10",
        amount: 1000,
        operation_type: "deposit",
        category: "sales",
        business_type: "B2B",
      },
    ];

    expect(() => parseFinancialMovements(payload)).toThrow(
      "operation_type must be income or outcome",
    );
  });
});
