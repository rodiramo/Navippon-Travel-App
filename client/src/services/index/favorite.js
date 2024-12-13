import config from "@config/config.js";

export const addFavorite = async ({ token, experienceId }) => {
  const response = await fetch(`${config.API_URL}/favorite`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      experienceId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Error adding favorite: ${error.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.isFavorite;
};

export const getFavorites = async (token) => {
  const response = await fetch(`${config.API_URL}/favorite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Error fetching favorites: ${error.message || response.statusText}`
    );
  }

  const data = await response.json();
  return data.favorites;
};

export const isFavoriteExperience = async ({ token, experienceId }) => {
  if (!experienceId) {
    throw new Error("Experience ID is required.");
  }
  const response = await fetch(
    `${config.API_URL}/favorite/status?experienceId=${experienceId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error fetching favorite status: ${error.message}`);
  }

  const { isFavorite } = await response.json();
  return isFavorite;
};
