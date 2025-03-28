"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  slug: string;
  _id: string;
  createdAt: string;
  image: string;
  category: string[];
  title: string;
  author: string;
  content: string;
  authorImage: string;
}

const ArticleDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id)
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog data inside useEffect
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data: Blog = await res.json();
        console.log(data)
        setBlog(data.data);
      } catch (err) {
        setError("Blog not found",err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]); // Re-fetch if `id` changes

 
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Blog not found</div>;
  }

 
  

  return (
    <div className="bg-gray-100 min-h-screen mt-24">
      {/* Header Section */}
      <header
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/blog-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">NextBuy Article</h1>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <nav className="container mx-auto py-4 px-6 text-sm text-gray-600">
        <Link href="/" className="hover:underline">Home</Link> &gt;
        <Link href="/category/design-trends" className="hover:underline"> Design Trends</Link> &gt;
        <span className="text-gray-800"> Minimalist Design Furniture 2024</span>
      </nav>

      {/* Blog Content Section */}
      <main className="container mx-auto grid md:grid-cols-3 gap-8 px-6 pb-12">
        {/* Main Blog Content */}
        <article className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
          <p className="text-gray-500 mb-4">Posted by <span className="font-semibold">{blog.author}</span> on {blog.createdAt}</p>
          <Image src={blog.image} alt={blog.title} width={800} height={400} className="rounded-lg mb-6" />
          <p className="text-gray-700 leading-relaxed">
           {blog.content}
          </p>
        </article>

        {/* Sidebar */}
        <aside className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li><Link href="/category/decor" className="text-blue-600 hover:underline">Decoration</Link></li>
            <li><Link href="/category/furniture" className="text-blue-600 hover:underline">Furniture</Link></li>
            <li><Link href="/category/trends" className="text-blue-600 hover:underline">Trends</Link></li>
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-4">Recent Posts</h3>
          <ul className="space-y-2">
            <li><Link href="/post/modern-living" className="text-blue-600 hover:underline">Modern Living Room Ideas</Link></li>
            <li><Link href="/post/outdoor-furniture" className="text-blue-600 hover:underline">Outdoor Furniture Trends</Link></li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default ArticleDetails;
