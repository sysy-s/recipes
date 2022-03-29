import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NewRecipeForm from "./components/recipes/forms/NewRecipeForm";
import RecipeDetail from "./components/recipes/RecipeDetail";
import RecipeList from "./components/recipes/RecipeList";
import UpdateRecipeForm from "./components/recipes/forms/UpdateRecipeForm";
import SearchProvider from "./components/Context";

function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route
          path="/admin"
          element={
            <Layout admin={true}>
              <RecipeList admin={true} />
            </Layout>
          }
        />
        <Route
          path="/admin/add"
          element={
            <Layout admin={true}>
              <NewRecipeForm admin={true} />
            </Layout>
          }
        />
        <Route
          path="/admin/:id"
          element={
            <Layout admin={true}>
              <RecipeDetail admin={true} />
            </Layout>
          }
        />
        <Route
          path="/admin/:id/update"
          element={
            <Layout admin={true}>
              <UpdateRecipeForm admin={true} />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout admin={false}>
              <RecipeList admin={false} />
            </Layout>
          }
        />
        <Route
          path="/:id"
          element={
            <Layout admin={false}>
              <RecipeDetail admin={false} />
            </Layout>
          }
        />
      </Routes>
    </SearchProvider>
  );
}

export default App;
