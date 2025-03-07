import React from 'react';

function ProductCard({ imageUrl, amount, onPayNow }) {
  return (
    <div className="text-center border border-gray-300 p-5 w-64 m-5 rounded-lg">
      <img
        src={imageUrl}
        alt="Product"
        className="max-w-full h-auto mb-2"
      />
      <div className="m-5 font-bold">₹{amount.toFixed(2)}</div>
      <button
        onClick={() => onPayNow(amount)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Pay Now
      </button>
    </div>
  );
}

export default ProductCard;