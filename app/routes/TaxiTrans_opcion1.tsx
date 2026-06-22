import React from "react";
import img from "../assets/images/hero_images/myTaxi.jpg"
import imgProfile from "../assets/images/jacob_profile.jpg"


export default function TaxiTrans() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url(" + img + ")",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">
            Gran Canaria Taxi Transfers
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Reliable, official, and comfortable rides directly from LPA Airport
            to your destination.
          </p>
          <button className="mt-8 bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition">
            Book Your Transfer
          </button>
        </div>
      </div>

      {/* Info Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose an Official Transfer?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3 text-blue-900">
              Airport Meet & Greet
            </h3>
            <p className="text-gray-600">
              Skip the taxi queues. I monitor your flight and meet you directly
              at Gran Canaria Airport (LPA) arrivals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3 text-blue-900">
              Fixed & Fair Pricing
            </h3>
            <p className="text-gray-600">
              As an official taxi, you get transparent, regulated meter rates to
              Maspalomas, Puerto Rico, or Las Palmas.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-3 text-blue-900">
              Spacious & Clean
            </h3>
            <p className="text-gray-600">
              Travel in comfort with plenty of room for luggage, golf clubs, and
              air conditioning for the Gran Canaria heat.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Info Section */}
      <section className="bg-blue-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-48 h-48 rounded-full bg-gray-300 overflow-hidden shrink-0 border-4 border-yellow-400">
            {/* Replace with your actual photo */}
            <img
              src={imgProfile}
              alt="Jacob Beck"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Meet Jacob Beck</h2>
            <p className="text-blue-200 text-lg mb-4">
              Official Gran Canaria Taxi Driver
            </p>
            <p className="mb-6 leading-relaxed">
              Welcome to the island! I take pride in providing a safe, friendly,
              and professional service. Whether you need a quick run to your
              resort in the south or a guided trip across the island's scenic
              routes, I ensure you reach your destination smoothly.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+34123456789"
                className="bg-white text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/34123456789"
                className="border border-white text-white px-6 py-2 rounded-full font-bold hover:bg-white/10 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
