"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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

        {/* Contact Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Get in Touch</h2>
          
          <div className="flex items-center gap-4">
            <FaPhone className="text-blue-600 text-xl" />
            <p>+1 234 567 890</p>
          </div>

          <div className="flex items-center gap-4">
            <FaEnvelope className="text-blue-600 text-xl" />
            <p>support@yourstore.com</p>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-blue-600 text-xl" />
            <p>123 E-commerce St, Business City, USA</p>
          </div>

      </div>

      <div className="flex gap-4 text-blue-600 text-2xl">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>


          <iframe
            className="w-full h-52 rounded-lg border"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509368!2d144.9559251158458!3d-37.81720974202124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f695f5%3A0x47c9a4e3e3d643b1!2sVictoria%20Harbour%20Promenade%2C%20Docklands%20VIC%203008%2C%20Australia!5e0!3m2!1sen!2sbd!4v1618456827703!5m2!1sen!2sbd"
            loading="lazy"
          ></iframe>



      </div>
    </div>
  );
};

export default Contact;
