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

export const addComment = async (data) => {
  const { themeId } = data;

  const response = await fetch(`${baseUrl}/${themeId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const deleteComment = async (data) => {
  const { themeId, postId } = data;

  const response = await fetch(`${baseUrl}/${themeId}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const editComment = async (data) => {
  const { themeId, postId } = data;

  const response = await fetch(`${baseUrl}/${themeId}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};

export const likeItem = async (data) => {
  const { themeId } = data;

  const response = await fetch(`${baseUrl}/${themeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
export const dislikeItem = async (data) => {
  const { themeId } = data;

  const response = await fetch(`${baseUrl}/dislike/${themeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response;
};
