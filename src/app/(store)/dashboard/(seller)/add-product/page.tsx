"use client";

import { imageUpload } from "@/redux/utils/ImageBbUpload";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Category {
  slug: string;
}

const AddProduct = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [additionalImagesPreview, setAdditionalImagesPreview] = useState<
    string[]
  >([]);
  const [categories, setCategories] = useState<Category[] | null>(null);

  const { data: session } = useSession();

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data.data);
    };
    getCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setLoading(true);

    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));

    if (price <= 0 || quantity <= 0) {
      console.error("Invalid price or quantity");
      setLoading(false);
      return;
    }

    const imageFile = formData.get("image") as File | null;
    const additionalImagesFiles = formData.getAll("additionalImages") as File[];

    const imageUrl = imageFile ? await imageUpload(imageFile) : null;
    const additionalImageUrls = await Promise.all(
      additionalImagesFiles.map((image) => imageUpload(image))
    );

    const finalData = {
      title: formData.get("title") as string,
      price: price,
      description: formData.get("description") as string,
      image: imageUrl,
      images: additionalImageUrls.filter(Boolean),
      category: formData.get("category") as string,
      quantity: quantity,
      sellerId: session?.user?.id as string,
    };

    try {
      const res = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        console.log("Product added successfully");
      } else {
        const errorData = await res.json();
        console.error("Failed to add product", errorData.message);
      }
    } catch (error) {
      console.error("Error posting product", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAdditionalImagesPreview([
        ...additionalImagesPreview,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="grid grid-cols-2 gap-x-4 gap-y-2"
      >
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Price ($)</label>
          <input
            type="number"
            name="price"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            defaultValue="Pick a category"
            className="select p-2 focus:outline-none border-black"
          >
            {categories?.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.slug}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-medium">
            Upload Thumbnail Image
          </label>
          <input
            type="file"
            name="image"
            className="w-full border p-2 rounded-md"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Thumbnail Preview"
              className="mt-2"
              width={70}
              height={90}
            />
          )}
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-medium">
            Upload Additional Images
          </label>
          <input
            type="file"
            name="additionalImages"
            className="w-full border p-2 rounded-md"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
          />
          <div className="mt-2">
            {additionalImagesPreview.map((url, index) => (
              <Image
                key={index}
                src={url}
                width={70}
                height={90}
                alt={`Additional Image Preview ${index}`}
                className="inline-block mr-2"
              />
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded-md"
            rows={3}
            required
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-[#3C9E26] text-white p-2 rounded-md font-bold"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
