import { AuthProvider } from "@refinedev/core";
import { notification } from "antd";
import { disableAutoLogin, enableAutoLogin } from "./hooks";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  // login: async ({ reference, password }) => {
  //   // enableAutoLogin();
  //   // localStorage.setItem(TOKEN_KEY, `${reference}-${password}`);
  //   const response = await fetch("http://localhost:8080/api/v1/web/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username: reference,
  //       password: password
  //     }),
  //     credentials: "include",
  //     mode: "cors"
  //   })
    
  //   const data = await response.json();
  //   if (response.status === 200) {
  //     localStorage.setItem(TOKEN_KEY, JSON.stringify({
  //       id: data.id,
  //       reference: data.reference,
  //       index: data.index,
  //       name: data.name,
  //       year: data.year,
  //       total_strike: data.total_strike,
  //       user: data.user,
  //       programme: data.programme
  //     }));
  //   }
  //   return {
  //     success: true,
  //     redirectTo: "/",
  //   };
  // },
  
    login: async ({ reference, password }) => {
    if (reference && password) {
      // localStorage.setItem(TOKEN_KEY, {})
      const response = await fetch("https://knust-ams.up.railway.app/api/student-login", {
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
                id: data._id,
                username: data.name,
                email: data.email,
                avatar: data.companyLogo,
                companyNumber: data.companyNumber,
                companyName: data.companyName,
                companyEmail: data.companyEmail,
                exporterCode: data.exporterCode,
                roles: data.roles
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
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },


  register: async ({ email, password }) => {
    try {
      await authProvider.login({ email, password });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: "Register failed",
          name: "Invalid email or password",
        },
      };
    }
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
    if (!token) {
      return null;
    }

    return {
      id: 1,
      name: "James Sullivan",
      avatar: "https://i.pravatar.cc/150",
    };
  },
};
