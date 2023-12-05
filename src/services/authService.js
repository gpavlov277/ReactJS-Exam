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

export const register = async (email, username, password, repeatPassword) => {
  const result = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, username, password, repeatPassword }),
  });
  return result;
};
