const baseUrl = "http://localhost:3000/api/posts";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};
