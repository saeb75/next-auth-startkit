import useAuthStore from "@/stores/auth";
import { Button } from "@material-tailwind/react";
import React from "react";

const Home = () => {
  const { user, authenticated, logout } = useAuthStore();
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={logout} color="red">
        Logout
      </Button>
    </div>
  );
};

export default Home;
