const DashboardFooter = () => {
  return (
    <div className="bg-gray-100 py-4 px-6 text-gray-600 border-t font-medium border-gray-300 flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center text-center">
        <p className="text-sm md:text-base">
          <span className="font-bold text-black">NEXTBUY</span> ©{" "}
          {new Date().getFullYear()}- CREATED BY{" "}
          <span className="font-bold">NEXTBUY STUDIO</span>.{" "}
          <span className="text-sm md:text-base font-bold">
            PREMIUM E-COMMERCE SOLUTIONS.
          </span>
        </p>
      </div>
    </div>
  );
};

export default DashboardFooter;
