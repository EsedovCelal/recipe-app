export const SearchRecipes = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:7000/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("HTTP error! status:" + response.status);
  }

  return response.json();
};
