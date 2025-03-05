import React from 'react'
import ProductCard from './ProductCard'
// import axios from axios

const Home = () => {

  const handlePayNow = async () => {

    // const {} = await axios.post("http://localhost:3000",{
    //   amount
    // })
  };


  return (
    <>
    <ProductCard
        imageUrl="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRKLLbUfp_zfR9FYMYjFw5OsgRNwNNl3csAUbLaQBQCyCeYDFFFuLw5tqyiXhhu5LsyzmtFy5P63hXGvniMiWMKXVN-u4IZaHHPHk3I5BQEl3MLQ8elJvTn"
        amount={2000}
        onPayNow={handlePayNow}
      />
    </>
  )
}

export default Home