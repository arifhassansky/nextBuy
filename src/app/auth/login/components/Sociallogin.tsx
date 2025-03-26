import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
const Sociallogin = () => {
    return (
         <div className="flex justify-center space-x-4 mt-2">
        <button className="flex items-center px-4 py-2 border rounded-md">
        <FcGoogle className="text-xl" /> 
          <span className="ml-2 text-sm">Google</span>
        </button>
        <button className="flex items-center px-4 py-2 border rounded-md">
        <FaGithub className="text-xl"/>
          <span className="ml-2 text-sm">Facebook</span>
        </button>
      </div>
    );
};

export default Sociallogin;