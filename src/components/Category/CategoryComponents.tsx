import Image from "next/image";

type CategoryComponentsType = {
  img: string;
  value: string;
  description: string;
};

const CategoryComponents = ({
  img,
  value,
  description,
}: CategoryComponentsType) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="bg-gray-200 rounded-full flex items-center justify-center p-3 w-48 h-48 overflow-hidden">
        <Image
          width={400}
          height={300}
          src={img}
          alt={value}
          className="h-60 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110 p-1"
        />
      </div>
      <div className="flex items-center flex-col justify-center mx-auto mt-2">
        <span className="font-bold">{value}</span>

        <p>
          {description.length > 30
            ? `${description.substring(0, 30)}...`
            : description}
        </p>
      </div>
    </div>
  );
};

export default CategoryComponents;
