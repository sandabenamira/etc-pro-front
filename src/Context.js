import { createContext } from "react";

export const RoleContext = createContext({
  authenticated: false, // to check if authenticated or not
  user: {}, // store all the user details
  accessToken: "", // accessToken of user for Auth0
  initiateLogin: () => {}, // to start the login process
  handleAuthentication: () => {}, // handle Auth0 login process
  logout: () => {} // logout the user
});

// export const ContextProvider = Context.Provider;
// export const ContextConsumer = Context.Consumer;