import React from 'react';

function ProductCard({ imageUrl, amount, onPayNow }) {
  return (
    <div style={{ textAlign: 'center', border: '1px solid #ddd', padding: '20px', width: '250px', margin: '20px', borderRadius: '8px' }}>
      <img
        src={imageUrl}
        alt="Product"
        style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
      />
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>${amount.toFixed(2)}</div>
      <button
        onClick={onPayNow}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Pay Now
      </button>
    </div>
  );
}

export default ProductCard;