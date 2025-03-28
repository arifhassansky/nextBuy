"use client";
import { useState } from "react";

const AddProduct = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Price ($)</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          rows="3"
          required
        />

        <label className="block mb-2 font-medium">Main Image URL</label>
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Additional Images</label>
        {product.images.map((img, index) => (
          <input
            key={index}
            type="text"
            value={img}
            onChange={(e) => handleImageChange(e, index)}
            className="w-full border p-2 rounded-md mb-2"
            placeholder={`Image URL ${index + 1}`}
          />
        ))}

        <label className="block mb-2 font-medium">Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#3C9E26] text-white p-2 rounded-md font-bold"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
