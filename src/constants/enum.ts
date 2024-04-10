export enum UserRole {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
}

export enum Weather {
  MONSOON = "MONSOON",
  WINTER = "WINTER",
  SUMMER = "SUMMERs",
}

export enum PaymentMethod {
  CASH = "CASH",
  NET_BANKING = "NET_BANKING",
  CARD = "CARD",
  CREDIT_CARD = "Credit Card",
  DEBIT_CARD = "Debit Card",
  PAYPAL = "PayPal",
}

export enum PaymentStatus {
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  PENDING = "PENDING",
}

export enum CouponsType {
  PERCENTAGE = "PERCENTAGE",
  FIXED = "FIXED",
}

export enum OrderState {
  PREPARING = "PREPARING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
