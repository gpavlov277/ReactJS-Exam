const baseUrl = "http://localhost:3000/api";

export const login = async (email, password) => {
  const result = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return result;
};
