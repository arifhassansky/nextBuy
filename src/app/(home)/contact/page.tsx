"use client";

import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", phone: "", orderId: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      {/* Header */}
      <div className="bg-green-600 text-white py-16 w-full text-center">
        <h1 className="text-5xl font-extrabold">Contact Us</h1>
        <p className="mt-2 text-lg">We are here to assist you with any inquiries.</p>
      </div>

      {/* Contact Form & Details */}
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form 
          className="bg-white shadow-xl rounded-lg p-8 space-y-6 w-full max-w-lg mx-auto" 
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Send us a Message</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone (Optional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="orderId"
              placeholder="Order ID (Optional)"
              value={formData.orderId}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
