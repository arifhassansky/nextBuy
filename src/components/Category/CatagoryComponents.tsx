import Image from "next/image";

type CategoryComponentsType = {
  img: string;
  value: string;
};

const CategoryComponents = ({ img, value }: CategoryComponentsType) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="bg-gray-200 rounded-full flex items-center justify-center p-3 w-48 h-48 overflow-hidden">
        <Image
          width={100}
          height={100}
          src={img}
          alt={value}
          className="h-60 object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
        />
      </div>
      <div className="flex items-center  justify-center mx-auto mt-2">
        <span className="font-bold">{value}</span>
      </div>
    </div>
  );
};

export default CategoryComponents;
