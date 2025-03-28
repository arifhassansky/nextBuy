"use client";

interface AddProduct {
   title: string;
   price: number;
   description: string;
   image: string;
   images: string[];
   category: string;
   quantity: number;
}

const AddProduct = (): JSX.Element => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          name="title"
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Price ($)</label>
        <input
          type="number"
          name="price"
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Description</label>
        <textarea
          name="description"
          className="w-full border p-2 rounded-md mb-4"
          rows={3}
          required
        />

        <label className="block mb-2 font-medium">Main Image URL</label>
        <input
          type="text"
          name="image"
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Additional Images</label>

        <label className="block mb-2 font-medium">Category</label>
        <input
          type="text"
          name="category"
          className="w-full border p-2 rounded-md mb-4"
          required
        />

        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          className="w-full border p-2 rounded-md mb-4"
          required
        />

            <button
               type='submit'
               className='w-full bg-[#3C9E26] text-white p-2 rounded-md font-bold'
            >
               Add Product
            </button>
         </form>
      </div>
   );
};

export default AddProduct;
