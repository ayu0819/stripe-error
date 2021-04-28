import Stripe from "stripe";

// バックエンドの処理を書いています。

const stripe = new Stripe("sk_test_.......");


export default async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "JPY",
      description: "Delicious empanadas",
      payment_method: id,
      confirm: true
    });

    console.log(payment);

    return res.status(200).json({
      confirm: "success"
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message
    });
  }
};
