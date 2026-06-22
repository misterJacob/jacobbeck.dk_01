import React from 'react'
import { Link } from 'react-router';

export default function Shop() {
  return (
    <div
      id="shop"
      className=" min-h-screen py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      
      <h1>Shopping</h1>
      <Link to={"/shopping"}>Go Shopping</Link>
    </div>
  );
}
