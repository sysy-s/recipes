import { useNavigate } from "react-router-dom";

export const fetchToken = () => {
  return localStorage.getItem("adminAuth");
};

export const removeToken = () => {
  return localStorage.removeItem("adminAuth");
};

export default function RequireToken({ children }) {
  const auth = fetchToken();
  const nav = useNavigate();

  if (!auth) {
    return nav("/admin/add");
  } else {
    return <> {children} </>;
  }
}
