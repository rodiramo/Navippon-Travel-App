import config from "@config/config.js";

/* hotels */
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

/* activities */
export const fetchActivities = async (token) => {
  const response = await fetch(`${config.API_URL}/activities`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch activities");
  }

  return await response.json();
};

export const saveOrUnsaveActivity = async (
  loggedInUserId,
  activityId,
  isSaved,
  token
) => {
  const method = isSaved ? "DELETE" : "PATCH";
  const response = await fetch(
    `${config.API_URL}/users/${loggedInUserId}/favorites/${activityId}`,
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
    throw new Error(errorText || "Failed to update favorite activities");
  }

  return await response.json();
};

export const deleteActivity = async (activityId, token) => {
  const response = await fetch(`${config.API_URL}/activities/${activityId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete activity");
  }

  return await response.json();
};

export const fetchUpdatedActivity = async (activityId, token) => {
  const response = await fetch(`${config.API_URL}/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to fetch updated activity");
  }

  return await response.json();
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
