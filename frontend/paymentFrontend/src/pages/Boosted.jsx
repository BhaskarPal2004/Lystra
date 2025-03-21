import axios from "axios"
import { useState } from "react"

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

const Boosted = () => {
    const [planDetails, setPlanDetails] = useState({ days: 0, amount: 0 })

    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJpZCI6IjY3ZDE3ODBiOTY5M2UzYjUyMjAwMDlhMyIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE3NDI1MzgwNzcsImV4cCI6MTc0MjU3MDQ3N30.JaeSIA9XnPLWjBgVh9j_cVTv9jkkiXXnxQYIXUbYNX0'
    const adId = '67dd16fe805e2bf18992a1ef'

    const handleSetData = (e) => {
        console.log(e.target.innerText.split('Days')[0])
        console.log(e.target.innerText.split('Days')[1].trim())
        setPlanDetails({
            days: e.target.innerText.split('Days')[0],
            amount: e.target.innerText.split('Days')[1].trim()
        })
    }

    const handlePayNow = async () => {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay failed to load!!')
            return
        }

        const { data: { key } } = await axios.get("http://localhost:3000/api/payment/getKey")

        const response = await axios.post(`http://localhost:3000/api/payment/boost/ad/payment/checkout/${adId}`, planDetails, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        console.log(response)

        const options = {
            key: key,
            amount: response.data.data.amount,
            currency: "INR",
            name: "Lystra",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: response.data.data.id,
            callback_url: `http://localhost:3000/api/payment/boost/ad/payment/verification/${adId}/${response.data.data.amount}/${response.data.data.notes.days}`,
            notes: { "address": "Razorpay Corporate Office" },
            theme: { "color": "orange" }
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.on('payment.failed', async (response) => {
            console.log(response)
        })

        paymentObject.open();
    }

    return (
        <div className="flex justify-center items-center h-[50vh] gap-5">

            <button className="border border-black text-xl p-5 cursor-pointer focus:bg-green-800" onClick={handleSetData}>
                <div className="pointer-events-none">7 Days</div>
                <div className="pointer-events-none">250</div>
            </button>
            <button className="border border-black text-xl p-5 cursor-pointer focus:bg-green-800" onClick={handleSetData}>
                <div className="pointer-events-none">30 Days</div>
                <div className="pointer-events-none">700</div>
            </button>
            <button className="border border-black text-xl p-5 cursor-pointer focus:bg-green-800" onClick={handleSetData}>
                <div className="pointer-events-none">90 Days</div>
                <div className="pointer-events-none">1800</div>
            </button>
            <div>
                <div>{planDetails.days}</div>
                <div>{planDetails.amount}</div>
            </div>
            <button className="bg-violet-400 cursor-pointer p-5" onClick={handlePayNow}>Make Payment</button>
        </div>
    )
}

export default Boosted