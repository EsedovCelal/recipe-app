import express from "express";
import cors from "cors";
import * as RecipeApi from "./recipe-api";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeApi.searchRecipes(searchTerm, page);

  return res.json(results);
});

app.listen(7000, () => {
  console.log("Server is running on localhost:7000");
});
