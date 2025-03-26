import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
const Sociallogin = () => {

  const router = useRouter();
  const session = useSession();
  console.log(session)

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { redirect: false });
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      toast.success("Login Successfully");
      router.push("/");
    }
  }, [session?.status]);

  return (
    <div className="flex justify-center space-x-4 mt-2">
      <button
        className="flex items-center px-4 py-2 border rounded-md"
        onClick={() => handleSocialLogin("google")}
      >
        <FcGoogle className="text-xl" />
        <span className="ml-2 text-sm">Google</span>
      </button>
      <button
        className="flex items-center px-4 py-2 border rounded-md"
        onClick={() => handleSocialLogin("github")}
      >
        <FaGithub className="text-xl" />
        <span className="ml-2 text-sm">Facebook</span>
      </button>
    </div>
  );
};

export default Sociallogin;
