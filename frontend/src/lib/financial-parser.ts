import {
  type BusinessType,
  type Category,
  type FinancialMovement,
  type OperationType,
} from "./financial-types";

const OPERATION_TYPES = new Set<OperationType>(["income", "outcome"]);
const CATEGORIES = new Set<Category>([
  "suppliers",
  "sales",
  "operational",
  "administrative",
  "others",
]);
const BUSINESS_TYPES = new Set<BusinessType>(["B2B", "B2C"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isISODateLike(value: string): boolean {
  return !Number.isNaN(Date.parse(value));
}

function parseMovement(value: unknown, index: number): FinancialMovement {
  if (!isRecord(value)) {
    throw new Error(`Invalid movement at index ${index}: expected object`);
  }

  const createDate = value.create_date;
  const amount = value.amount;
  const operationType = value.operation_type;
  const category = value.category;
  const businessType = value.business_type;

  if (typeof createDate !== "string" || !isISODateLike(createDate)) {
    throw new Error(
      `Invalid movement at index ${index}: create_date must be a valid date string`,
    );
  }

  if (typeof amount !== "number" || Number.isNaN(amount)) {
    throw new Error(`Invalid movement at index ${index}: amount must be a number`);
  }

  if (typeof operationType !== "string" || !OPERATION_TYPES.has(operationType as OperationType)) {
    throw new Error(
      `Invalid movement at index ${index}: operation_type must be income or outcome`,
    );
  }

  if (typeof category !== "string" || !CATEGORIES.has(category as Category)) {
    throw new Error(
      `Invalid movement at index ${index}: category has an unsupported value`,
    );
  }

  if (typeof businessType !== "string" || !BUSINESS_TYPES.has(businessType as BusinessType)) {
    throw new Error(
      `Invalid movement at index ${index}: business_type must be B2B or B2C`,
    );
  }

  return {
    create_date: createDate,
    amount,
    operation_type: operationType as OperationType,
    category: category as Category,
    business_type: businessType as BusinessType,
  };
}

export function parseFinancialMovements(payload: unknown): FinancialMovement[] {
  if (!Array.isArray(payload)) {
    throw new Error("Invalid API payload: expected an array of movements");
  }

  return payload.map((item, index) => parseMovement(item, index));
}