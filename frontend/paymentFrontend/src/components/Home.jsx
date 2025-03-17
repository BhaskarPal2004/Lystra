import React from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Home = () => {
  const handlePayNow = async (amount) => {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay failed to load!!')
      return
    }

    const { data: { key } } = await axios.get("http://localhost:3000/api/payment/getKey")

    const { data: { data } } = await axios.post("http://localhost:3000/api/payment/paymentCheckout/67d187d22147f6c286d009b4", { amount });

    const options = {
      key: key,
      amount: data.amount,
      currency: "INR",
      name: "Lystra",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id,
      callback_url: "http://localhost:3000/api/payment/paymentVerification",
      notes: { "address": "Razorpay Corporate Office" },
      theme: { "color": "orange" }
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on('payment.failed', async (response) => {
      console.log(response)
      await axios.post(`http://localhost:3000/api/payment/update/failed/payment/${response.error.metadata.order_id}/${response.error.metadata.payment_id}`)
    })

    paymentObject.open();
  }

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <ProductCard
          imageUrl="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSifYdAmXaAtzbz3E_waAQ09QYePS4cLEUxkISIw4WAOXzjyaw_CUuaxSbegnbV9ts0ShooXM7meR4XtcOrTpzEB2XuPbqaff3AVLCcAjeK"
          amount={2000}
          onPayNow={handlePayNow}
        />

        <ProductCard
          imageUrl="https://inspireonline.in/cdn/shop/files/m1airgrey1.jpg?v=1692617632"
          amount={80000}
          onPayNow={handlePayNow}
        />
      </div>
      <div>
        <button className="bg-black text-white p-2 font-bold text-2xl">
          <Link to='/chat'>Chat Page</Link>
        </button>
      </div>

    </>
  );
}

export default Home;
