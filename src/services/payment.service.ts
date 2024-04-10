import { razorpay } from "../config";
import { PaymentMethod, PaymentStatus } from "../constants";
import { AppDataSource } from "../data-source";
import { orderDetailsInput } from "../dto";
import { Orders } from "../entities";
import { PaymentHistory } from "../entities/payment_history.entity";
import { _NotFoundError } from "../utils/custom-error";

export const generatePaymentLink = async (id: number) => {
  try {
    const orderId: number = id;

    const orderRepo = AppDataSource.getRepository(Orders);
    const order = await orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: {
        users: true,
      },
    });

    if (!order) {
      throw new _NotFoundError("Order was not found.");
    }

    const orderDetails = <orderDetailsInput>order.orderDetails;
    const totalAmount = orderDetails.toPay;

    const paymentLink = await razorpay.paymentLink.create({
      reference_id: `${order.id}`,
      amount: totalAmount * 100, // Total amount in paisa (multiply by 100 for rupees to paisa conversion)
      expire_by: new Date().setMinutes(new Date().getMinutes() + 15), // Expire in 15 minutes
      notes: {
        restaurant_name: "Food Plaza", // Add restaurant name or any other notes
      },
      currency: "INR", // Currency
      // reference_id: `${orderId}`, // Use a unique identifier for the order
      description: "Payment for food order", // Description for the payment
      customer: {
        name: order.users.fullName, // Customer's full name
        // contact: `+91${order.users.phoneNumber}`, // Customer's phone number
        email: order.users.email, // Customer's email
      },
      notify: {
        sms: true,
        email: true,
        whatsapp: true, // Enable notifications via SMS, email, and WhatsApp
      },
      reminder_enable: true, // Enable reminders
      callback_url: `http://localhost:3000/payment-success`,
      callback_method: "get", // Callback method      callback_url: 'http://localhost:3000/payment-callback?paymentId={PAYMENT_ID}'

      options: {
        checkout: {
          name: "Food Plaza", // Name of the checkout page
          method: {
            netbanking: true,
            card: true,
            upi: true,
            wallet: true, // Enable payment methods like netbanking, card, UPI, and wallet
          },
        },
      },
    });

    const paymentId = paymentLink.id;
    const paymentUrl = paymentLink.short_url;

    return {
      paymentId,
      paymentUrl,
    };
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
};

export const addPayment = async (orderId: number, paymentId: string) => {
  try {
    const paymentUrl = await razorpay.paymentLink.fetch(paymentId);
    const payment = paymentUrl.payments;

    const orderRepo = AppDataSource.getRepository(Orders);
    const order = await orderRepo.findOne({
      where: {
        id: orderId,
      },
      relations: {
        users: true,
      },
    });

    if (!order) {
      throw new _NotFoundError("Order was not found.");
    }

    const newPayment = new PaymentHistory();
    if (payment) {
      newPayment.orders = order;
      newPayment.amount = newPayment.amount = Number(paymentUrl.amount);
      newPayment.amountDue = Number(paymentUrl.amount_paid) || 0;
      newPayment.transactionAt = new Date(+payment.created_at * 1000);
      newPayment.transactionId = payment.payment_id;
      newPayment.cancelledAt = new Date(paymentUrl.cancelled_at * 1000);

      if (paymentUrl.status === "paid") {
        newPayment.paymentStatus = PaymentStatus.COMPLETED;
      } else if (paymentUrl.status === "cancelled") {
        newPayment.paymentStatus = PaymentStatus.FAILED;
      } else if (paymentUrl.status === "expired") {
        newPayment.paymentStatus = PaymentStatus.FAILED;
      } else if (paymentUrl.status === "created") {
        newPayment.paymentStatus = PaymentStatus.PENDING;
      } else {
        newPayment.paymentStatus = PaymentStatus.PENDING;
      }
    }

    const paymentRepository = AppDataSource.getRepository(PaymentHistory);
    const addedPayment = await paymentRepository.save(newPayment);

    return addedPayment;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
};

export const createOrUpdatePayment = async (
  paymentUrlId: string,
  paymentId: string
) => {
  const paymentRepository = AppDataSource.getRepository(PaymentHistory);

  const foundPayment = await paymentRepository.findOne({
    where: {
      transactionId: paymentId,
    },
  });

  if (!foundPayment) {
    const response = addNewPayment(paymentUrlId, paymentId);
    return response;
  }

  try {
    const paymentUrl = await razorpay.paymentLink.fetch(paymentUrlId);
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      throw new _NotFoundError("payment not found");
    }

    const paymentMethod = (
      paymentUrl.payments as unknown as { method: string }[]
    )[0].method;

    const orderRepo = AppDataSource.getRepository(Orders);
    const order = await orderRepo.findOne({
      where: {
        id: Number(paymentUrl.reference_id),
      },
      relations: {
        users: true,
      },
    });

    if (!order) {
      throw new _NotFoundError("Order was not found.");
    }

    foundPayment.amount = Number(paymentUrl.amount) / 100;
    foundPayment.amountPaid = Number(paymentUrl.amount_paid) / 100;
    foundPayment.amountDue = foundPayment.amount - foundPayment.amountPaid;
    foundPayment.transactionId = paymentId;
    foundPayment.transactionAt = new Date(payment.created_at * 1000);

    if (paymentMethod == "card") {
      foundPayment.paymentMethod = PaymentMethod.CARD;
    } else if (paymentMethod === "netbanking") {
      foundPayment.paymentMethod = PaymentMethod.NET_BANKING;
    }

    if (paymentUrl.status === "paid") {
      foundPayment.paymentStatus = PaymentStatus.COMPLETED;
    } else if (paymentUrl.status === "cancelled") {
      foundPayment.paymentStatus = PaymentStatus.FAILED;
    } else if (paymentUrl.status === "expired") {
      foundPayment.paymentStatus = PaymentStatus.FAILED;
    } else if (paymentUrl.status === "created") {
      foundPayment.paymentStatus = PaymentStatus.PENDING;
    } else {
      foundPayment.paymentStatus = PaymentStatus.PENDING;
    }

    const updatePayment = await paymentRepository.save(foundPayment);

    return updatePayment;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
};

export const addNewPayment = async (
  paymentUrlId: string,
  paymentId: string
) => {
  try {
    const paymentUrl = await razorpay.paymentLink.fetch(paymentUrlId);
    const payment = await razorpay.payments.fetch(paymentId);

    const paymentRepository = AppDataSource.getRepository(PaymentHistory);

    if (!payment) {
      throw new _NotFoundError("payment not found");
    }

    const paymentMethod = (
      paymentUrl.payments as unknown as { method: string }[]
    )[0].method;

    const orderRepo = AppDataSource.getRepository(Orders);
    const order = await orderRepo.findOne({
      where: {
        id: Number(paymentUrl.reference_id),
      },
      relations: {
        users: true,
      },
    });

    if (!order) {
      throw new _NotFoundError("Order was not found.");
    }

    const newPayment = new PaymentHistory();
    newPayment.orders = order;
    newPayment.amount = Number(paymentUrl.amount) / 100;
    newPayment.amountPaid = Number(paymentUrl.amount_paid) / 100;
    newPayment.amountDue = newPayment.amount - newPayment.amountPaid;
    newPayment.transactionId = paymentId;
    newPayment.transactionAt = new Date(payment.created_at * 1000);

    if (paymentMethod == "card") {
      newPayment.paymentMethod = PaymentMethod.CARD;
    } else if (paymentMethod === "netbanking") {
      newPayment.paymentMethod = PaymentMethod.NET_BANKING;
    }

    if (paymentUrl.status === "paid") {
      newPayment.paymentStatus = PaymentStatus.COMPLETED;
    } else if (paymentUrl.status === "cancelled") {
      newPayment.paymentStatus = PaymentStatus.FAILED;
    } else if (paymentUrl.status === "expired") {
      newPayment.paymentStatus = PaymentStatus.FAILED;
    } else if (paymentUrl.status === "created") {
      newPayment.paymentStatus = PaymentStatus.PENDING;
    } else {
      newPayment.paymentStatus = PaymentStatus.PENDING;
    }

    const addPayment = await paymentRepository.save(newPayment);

    return addPayment;
  } catch (error) {
    console.error("Error creating payment link:", error);
    throw error;
  }
};

// export const generateInvoiceAndPaymentUrl = async (orderId: number) => {
//   try {
//     console.log("Hello1");
//     const orderRepo = AppDataSource.getRepository(Orders);
//     const order = await orderRepo.findOne({
//       where: {
//         id: orderId,
//       },
//       relations: {
//         users: true,
//       },
//     });

//     if (!order) {
//       throw new _NotFoundError("Order was not found.");
//     }

//     const orderDetails = <orderDetailsInput>order.orderDetails;

//     const userAddress = order.users.address.find(
//       (address: addressInput) => address.isPrimary
//     );

//     if (!userAddress) {
//       throw new _NotFoundError("User Address not found");
//     }

//     const lineItems = orderDetails.orderItems.map((item) => ({
//       name: item.foodName,
//       amount: item.foodPrice * 100,
//       currency: "INR",
//       quantity: item.quantity,
//       description: item.foodDescription,
//     }));

//     const { id, short_url } = await razorpay.invoices.create({
//       type: "invoice",
//       description: "Invoice for the Your Food Items",
//       date: Math.floor(new Date().getTime() / 1000),
//       notes: {
//         restaurant_name: "Food Plaza", // Add restaurant name or any other notes
//       },
//       // expire_by: Math.floor(new Date().getTime() / 1000 + 15 * 60), // Expire in 15 minutes
//       // receipt: "Food Plaza",

//       customer: {
//         name: order.users.fullName,
//         contact: order.users.phoneNumber,
//         email: order.users.email,
//         shipping_address: {
//           line1: userAddress.line1 || "",
//           line2: userAddress.line2 || "",
//           zipcode: userAddress.pincode,
//           city: userAddress.city,
//           state: userAddress.state,
//           country: userAddress.country,
//         },
//       },

//       amount: orderDetails.toPay * 100,

//       line_items: lineItems, // Using the formatted line items array
//       sms_notify: 1,
//       email_notify: 1,
//       currency: "INR",
//     });

//     return {
//       paymentUrl: short_url,
//       invoiceId: id,
//     };
//   } catch (error) {
//     console.error("Error creating payment link:", error);
//     throw error;
//   }
// };
