export enum UserRole {
  ADMIN = "Admin",
  CUSTOMER = "Customer",
}

export enum Weather {
  MONSOON = "Monsoon",
  WINTER = "Winter",
  SUMMER = "Summer",
}

export enum OrderStatus {
  PENDING = "Pending",
  OUT_FOR_DELIVERY = "Out for Delivery",
  FAILED = "Failed",
  COMPLETED = "Completed",
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
