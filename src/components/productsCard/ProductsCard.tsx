"use client";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";
import { Card } from "@/components/ui/Card/Card";
import { useGetProductsQuery } from "@/redux/ProductApi";

const ProductsCard = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const products = data?.data || [];

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <div>Error: {error?.message || "Failed to load products."}</div>;

  return (
    <div className="w-11/12 mx-auto px-4">
      {/* Grid layout for products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>
    </div>
  );
};

export default ProductsCard;
