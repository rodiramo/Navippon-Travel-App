import config from "@config/config.js";

/* experiences */
export const fetchExperiences = async (token) => {
  try {
    const response = await fetch(`${config.API_URL}/experiences`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error data:", errorData);
      throw new Error(errorData.message || "Error al obtener Experiencias.");
    }

    const data = await response.json();
    console.log("Fetched experiences data:", data);
    return data;
  } catch (error) {
    console.error("Fetch experiences error:", error);
    throw error;
  }
};

export const saveOrUnsaveExperience = async (
  loggedInUserId,
  experienceId,
  isSaved,
  token
) => {
  const method = isSaved ? "DELETE" : "PATCH";
  const response = await fetch(
    `${config.API_URL}/users/${loggedInUserId}/favorites/experiences/${experienceId}`,
    {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to update favorite experiences");
  }

  return await response.json();
};

export const deleteExperience = async (experienceId, token) => {
  const response = await fetch(
    `${config.API_URL}/experiences/${experienceId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete experience");
  }

  return await response.json();
};

/* fetch prefectures */
export const fetchPrefectures = async () => {
  const response = await fetch(`${config.API_URL}/prefectures`);
  if (!response.ok) {
    throw new Error("Failed to fetch prefectures");
  }
  return await response.json();
};

/* users  */
export const fetchUserPicture = async (token, postUserId) => {
  const response = await fetch(`${config.API_URL}/users/${postUserId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
};

/* fetch categories */
export const fetchCategoryDetails = async () => {
  const response = await fetch(`${config.API_URL}/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return await response.json();
};

/* fetch trips */
export const fetchTrips = async (token) => {
  const response = await fetch(`${config.API_URL}/trips`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch trips");
  }

  return await response.json();
};

/* delete trip */
export const deleteTrip = async (tripId, token) => {
  const response = await fetch(`${config.API_URL}/trips/${tripId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete trip");
  }

  return await response.json();
};
