import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../models/user";
import { useNavigate } from "react-router-dom";
import { loginAPI, logoutAPI } from "../services/authService";
import { useToast } from "@/components/ui/use-toast"
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  loginUser: ({ email, password }: { email: string; password: string }) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const loginUser = async (data: { email: string; password: string; }) => {
    await loginAPI(data)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setToken(res.data.token);
          setUser(res.data.user);
          navigate("/home");
        }
      })
      .catch(() => toast({ description: "Server error occured", variant: 'destructive' }));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = async () => {
    if (token) {
      await logoutAPI()
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setToken("");
          navigate("/");
        })
        .catch(() => toast({ description: "Server error occured", variant: 'destructive' }));
    }
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);