import ProductsPage from "./ProductsPage";
interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  search: string[] | string;
}

const Products = ({ searchParams }: Props) => {
  const search = searchParams.search || "";

  console.log(search);
  return (
    <div className="w-11/12 mx-auto px-4">
      <ProductsPage search={search as string[]} />
    </div>
  );
};

export default Products;
