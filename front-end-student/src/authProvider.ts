import { AuthProvider } from "@refinedev/core";
import { notification } from "antd";
import { disableAutoLogin, enableAutoLogin } from "./hooks";

export const TOKEN_KEY = "attendance-auth";

export const authProvider: AuthProvider = {
  
    login: async ({ reference, password }) => {
    if (reference && password) {
      // localStorage.setItem(TOKEN_KEY, {})
      const response = await fetch("https://knust-ams.up.railway.app/api/student-login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              username: reference,
              password: password
          }),
          // credentials: "include"
      })
      const data = await response.json()

      if (response.status === 200) {
        localStorage.setItem(TOKEN_KEY,
          JSON.stringify({
            id: data.id,
            reference: data.reference,
            index: data.index,
            name: data.name,
            year: data.year,
            total_strike: data.total_strike,
            user: data.user,
            programme: data.programme
        }));
        return {
          success: true,
          redirectTo: "/",
        };
      }
    }

    return {
      success: false,
      error: {
        name: "Student Login Fail",
        message: "Invalid reference or password",
      },
    };
  },


  updatePassword: async () => {
    notification.success({
      message: "Updated Password",
      description: "Password updated successfully",
    });
    return {
      success: true,
    };
  },
  forgotPassword: async ({ email }) => {
    notification.success({
      message: "Reset Password",
      description: `Reset password link sent to "${email}"`,
    });
    return {
      success: true,
    };
  },
  logout: async () => {
    disableAutoLogin();
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('storedData');
    localStorage.removeItem('verificationCode');

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + 'Thu, 01 Jan 1970 00:00:00 GMT' + ";path=/");
    });

    return {
      success: true,
      redirectTo: "/student-login",
    };
  },
  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Token not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      const parsedToken = JSON.parse(token)
      return {
        id: parsedToken.id,
        name: parsedToken.name,
        email: parsedToken.email,
        avatar: parsedToken.avatar,
        index: parsedToken.index
      }

    }

    return null
  },
};
