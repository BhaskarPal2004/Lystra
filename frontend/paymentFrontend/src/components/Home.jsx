import React from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

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

    if (!res){
      alert('Razropay failed to load!!')
      return 
    }

    const { data: {key}} = await axios.get("http://localhost:3000/api/payment/getKey")

    const { data: {data} } = await axios.post(
      "http://localhost:3000/api/payment/paymentCheckout",
      {
        amount,
      }
    );
    
    const options = {
      key: key,
      amount: data.amount,
      currency: "INR",
      name: "Lystra",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id,
      callback_url:"http://localhost:3000/api/payment/paymentVerification",
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#3399cc"
      }
  };

  const paymentObject = new window.Razorpay(options); 
  paymentObject.open();
  }

  return (
    <>
    <div>
    <ProductCard
        imageUrl="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRKLLbUfp_zfR9FYMYjFw5OsgRNwNNl3csAUbLaQBQCyCeYDFFFuLw5tqyiXhhu5LsyzmtFy5P63hXGvniMiWMKXVN-u4IZaHHPHk3I5BQEl3MLQ8elJvTn"
        amount={2000}
        onPayNow={handlePayNow}
      />

      <ProductCard
        imageUrl="https://inspireonline.in/cdn/shop/files/m1airgrey1.jpg?v=1692617632"
        amount={80000}
        onPayNow={handlePayNow}
      />
    </div>
    
    </>
  );
}

export default Home;
