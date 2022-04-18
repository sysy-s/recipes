import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default function Admin() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {
      if(!isAuthenticated) {
        loginWithRedirect();
      } else {
        logout();
      }
  }, []);

  return <></>

}
