import { createContext, useState } from "react";
import moment from "moment";

import { ceaAPI } from "../services/axios";
import { AuthService } from "../services";
import { TOKEN_DURATION_HOUR } from "../constants/authConfig";
import useStore from "../hooks/useStore";

const Context = createContext();

const AuthProvider = ({ children }) => {
  const { getDataLocalStorage, setDataLocalStorage, removeDataLocalStorage } = useStore()

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateSession = () => {
    const user = getDataLocalStorage("user");

    if (user) {
      const { token, expiresAt, isPrimaryAccess } = user;

      const dateNow = moment();
      const accessExpired = dateNow.isAfter(expiresAt);

      if (accessExpired) {
        return {
          isPrimaryAccess,
          authenticated: false,
        };
      }

      if (token) {
        ceaAPI.defaults.headers.Authorization = `Bearer ${token}`;
        return {
          isPrimaryAccess,
          authenticated: true,
        };
      }
    }

    return {
      authenticated: false,
      isPrimaryAccess: false,
    };
  }

  const handleLogin = async (payload) => {
    try {
      setError(false);
      setLoading(true);
      const { data } = await AuthService.login(payload);

      const { accessToken, isPrimaryAccess } = data;

      const persistData = {
        isPrimaryAccess,
        token: accessToken,
        username: payload.username,
        expiresAt: moment().add(TOKEN_DURATION_HOUR, 'hours'),
      };

      setDataLocalStorage("user", persistData);

      return isPrimaryAccess;
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = () => {
    removeDataLocalStorage("user");
    ceaAPI.defaults.headers.Authorization = undefined;
  }

  return (
    <Context.Provider value={{
      handleLogin,
      handleLogout,
      loading,
      error,
      validateSession,
    }}>
      {children}
    </Context.Provider>
  );
}

export {
  AuthProvider,
  Context
};