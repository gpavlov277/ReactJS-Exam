export const getAll = async () => {
  const response = await fetch("http://localhost:3000/api/themes");

  return response.json();
};
