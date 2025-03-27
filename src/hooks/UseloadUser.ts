import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  name: string;
  email: string;
  role?: string;
}

const useLoadUser = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    if (!userEmail) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/user/get-user/${userEmail}`);
      if (!response.ok) throw new Error("Failed to fetch user");

      const data: User = await response.json();
      setUser(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userEmail]);

  return { user };
};

export default useLoadUser;
