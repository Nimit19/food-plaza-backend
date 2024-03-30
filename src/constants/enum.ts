export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export enum Weather {
  MONSOON = "Monsoon",
  WINTER = "Winter",
  SUMMER = "Summer",
}

export enum PaymentMethod {
  CASH = "Cash",
  CREDIT_CARD = "Credit Card",
  DEBIT_CARD = "Debit Card",
  PAYPAL = "PayPal",
}

export enum PaymentStatus {
  COMPLETED = "Completed",
  FAILED = "Failed",
  PENDING = "Pending",
}

export enum CouponsType {
  PERCENTAGE = "Percentage",
  FIXED = "fixed",
}

export enum OrderState {
  PREPARING = "PREPARING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
