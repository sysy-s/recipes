import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NewRecipeForm from "./components/recipes/forms/NewRecipeForm";
import RecipeDetail from "./components/recipes/RecipeDetail";
import RecipeList from "./components/recipes/RecipeList";
import UpdateRecipeForm from "./components/recipes/forms/UpdateRecipeForm";
import SearchProvider from "./components/Context";
import TagsProvider from "./components/TagsContext";
import TagSelect from "./components/tags/TagSelect";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/auth0/Login";
import LogoutButton from './components/auth0/Logout';
import Admin from "./components/auth0/Admin";

function App() {
  const { user, isAuthenticated } = useAuth0();

  const ProtectedRoute = ({ auth, children }) => {
    if (!auth) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <TagsProvider>
      <SearchProvider>
        <Routes>
          <Route
            path="/admin"
            element={
              <Admin />
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute auth={isAuthenticated}>
                <Layout>
                  <NewRecipeForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:id/update"
            element={
              <ProtectedRoute auth={isAuthenticated}>
                <Layout>
                  <UpdateRecipeForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <Layout list={true}>
                <RecipeList />
              </Layout>
            }
          />
          <Route
            path="/:id"
            element={
              <Layout>
                <RecipeDetail />
              </Layout>
            }
          />
          <Route
            path="tags"
            element={
              <Layout>
                <TagSelect />
              </Layout>
            }
          />
        </Routes>
      </SearchProvider>
    </TagsProvider>
  );
}

export default App;
