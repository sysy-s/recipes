import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import NewRecipeForm from "./components/recipes/forms/NewRecipeForm";
import RecipeDetail from "./components/recipes/RecipeDetail";
import RecipeList from "./components/recipes/RecipeList";
import SearchProvider from "./components/Context";

function App() {
  return (
    <SearchProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<RecipeList />} />

          <Route path="/add" element={<NewRecipeForm />} />
          <Route path="/:id" element={<RecipeDetail />} />
        </Routes>
      </Layout>
    </SearchProvider>
  );
}

export default App;
