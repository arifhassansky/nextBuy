import ProductsPage from "./ProductsPage";

interface Props {
  searchParams: Record<string, string | string[] | undefined>;
}

const Products = ({ searchParams }: Props) => {
  const search = searchParams.search ?? "";

  console.log(search);

  return (
    <div className="w-11/12 mx-auto px-4">
      <ProductsPage search={Array.isArray(search) ? search : [search]} />
    </div>
  );
};

export default Products;
