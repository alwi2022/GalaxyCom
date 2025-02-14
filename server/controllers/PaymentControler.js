const midtransClient = require("midtrans-client");
const { Order } = require("../models");
const { Product } = require("../models/");
require("dotenv").config();
class PaymentControler {
  static async getPayment(req, res, next) {
    const { productId } = req.params;

    try {
      const product = await Product.findByPk(productId);
      // console.log(product, "product null");

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let orderId = Math.random().toString();
      let amount = product.price;

      let parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;

      await Order.create({
        orderId,
        amount,
        userId: req.user.id,
        productId: product.id,
      });
      res.json({
        message: "Order created successfully",
        transactionToken,
        orderId,
        amount,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

module.exports = PaymentControler;
