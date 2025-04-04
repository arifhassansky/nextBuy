"use client"
import { useState } from "react";

const contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderId: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Message Sent Successfully!");
    setFormData({ name: "", email: "", phone: "", orderId: "", message: "" });
  };
  return (
    <div className="h-screen mt-64 text-center font-bold text-7xl">
       <div className="bg-[#3c9e26] text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-lg">We are here to assist you with any inquiries.</p>
      </div>


      {/* Contact Form & Details */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="bg-white shadow-lg rounded-lg p-6 space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800">Send us a Message</h2>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone (Optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="orderId"
            placeholder="Order ID (Optional)"
            value={formData.orderId}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </form>






    </div>
    </div>

)
}

export default contact;
