const baseUrl = "http://localhost:3000/api/themes";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};

export const getOne = async (itemId) => {
  const response = await fetch(`${baseUrl}/${itemId}`);
  return response.json();
};

export const create = async (itemData) => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(itemData),
  });

  return response;
};

export const edit = async (itemId, itemData) => {
  const response = await fetch(`${baseUrl}/edit/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });
  return response;
};

export const deleteItem = async (itemId, token) => {
  const data = {
    itemId,
    token,
  };
  const response = await fetch(`${baseUrl}/delete/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
