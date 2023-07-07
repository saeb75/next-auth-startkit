import authServices from "@/services/authServices";
import Cookie from "js-cookie";
import { toast } from "react-hot-toast";

import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    token: "",
  },
  authenticated: false,
  login: async (user) => {
    authServices
      .login(user.email, user.password)
      .then((res) => {
        const data = res.data;
        if (res.success) {
          Cookie.set("token", data.token);
          toast.success(res.message);
          set((state) => ({
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              username: data.username,
              token: data.token,
            },
            authenticated: true,
          }));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.message);
      });
  },
  logout: () => {
    Cookie.remove("token");
    set((state) => ({
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        token: "",
      },
      authenticated: false,
    }));
  },
  getUserInfo: async () => {
    authServices
      .getUserInfo()
      .then((res) => {
        const data = res.data;
        if (res.success) {
          const token = Cookie.get("token");
          set((state) => ({
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              username: data.username,
              token: token,
            },
            authenticated: true,
          }));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err.message);
      });
  },
}));

export default useAuthStore;
