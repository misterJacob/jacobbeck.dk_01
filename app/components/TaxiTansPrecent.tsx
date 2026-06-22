import React from "react";
import { Link } from "react-router";


export default function TaxiTansport() {
  return (
    <div
      id="transfer"
      className=" min-h-screen py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative"
    >
      <h1>TaxiTansport</h1>
      <Link to={"/tra"}>Go To Transfer</Link>
    </div>
  );
}
