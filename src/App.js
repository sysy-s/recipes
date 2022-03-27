import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NewRecipeForm from "./components/recipes/forms/NewRecipeForm";
import RecipeDetail from "./components/recipes/RecipeDetail";
import RecipeList from "./components/recipes/RecipeList";
import UpdateRecipeForm from "./components/recipes/forms/UpdateRecipeForm";
import SearchProvider from "./components/Context";
import RequireToken from "./components/Auth";

function App() {
  return (
    <SearchProvider>
      <Layout>
        <Routes>
          <Route path="/admin" element={<RecipeList admin={true} />} />
          <Route path="/admin/add" element={<NewRecipeForm admin={true} />} />
          <Route path="/admin/:id" element={<RecipeDetail admin={true} />} />
          <Route
            path="/admin/:id/update"
            element={<UpdateRecipeForm admin={true} />}
          />
          <Route path="/" element={<RecipeList admin={false} />} />
          <Route path="/:id" element={<RecipeDetail admin={false} />} />
        </Routes>
      </Layout>
    </SearchProvider>
  );
}

export default App;
