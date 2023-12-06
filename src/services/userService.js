const baseUrl = "";

export const getOne = async (userId) => {
  const response = await fetch(`${baseUrl}/${userId}`);
};
