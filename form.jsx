import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import axios from "axios";


// フロントエンド を記述しています。

const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
      const { id } = paymentMethod;

      try {
        const { data } = await axios.post("/api/charge", { id, amount: 1200 });
        console.log(data);
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <h2>価格: 1200 円</h2>
      <img
        src="https://www.pakutaso.com/shared/img/thumb/mizuho2054_5_TP_V.jpg"
        style={{ maxWidth: "50px" }}
      />
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const stripePromise = loadStripe("pk_test_51I0JReEqGiSkmz2ni0xMlool4Ky9GL2DvmFPqVjx49f4rmvXoSYbql4HQ5zryKfnsomEs91gzP535269vzbQ1imI00RIirtdrc");

const Form = () => {
  const [status, setStatus] = React.useState("ready");

  if (status === "success") {
    return <div>成功しました。</div>;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={() => {
          setStatus("success");
        }}
      />
    </Elements>
  );
};

export default Form;