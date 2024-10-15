import config from "@config/config.js";

/* hotels */
export const fetchHotels = async (token) => {
  const response = await fetch(`${config.API_URL}/hotels`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener Hoteles.");
  }

  return await response.json();
};

export const deleteHotel = async (hotelId, token) => {
  const response = await fetch(`${config.API_URL}/hotels/${hotelId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete hotel");
  }

  return await response.json();
};

export const saveOrUnsaveHotel = async (
  loggedInUserId,
  hotelId,
  isSaved,
  token
) => {
  const method = isSaved ? "DELETE" : "PATCH";
  const response = await fetch(
    `${config.API_URL}/users/${loggedInUserId}/favorites/${hotelId}`,
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
    throw new Error(errorText || "Failed to update favorite hotel.");
  }

  return await response.json();
};

/* restaurants */
export const fetchRestaurants = async (token) => {
  const response = await fetch(`${config.API_URL}/restaurants`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener Restaurantes.");
  }

  return await response.json();
};

export const deleteRestaurant = async (restaurantId, token) => {
  const response = await fetch(
    `${config.API_URL}/restaurants/${restaurantId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to delete restaurant.");
  }

  return await response.json();
};

export const saveOrUnsaveRestaurant = async (
  loggedInUserId,
  restaurantId,
  isSaved,
  token
) => {
  const method = isSaved ? "DELETE" : "PATCH";
  const response = await fetch(
    `${config.API_URL}/users/${loggedInUserId}/favorites/${restaurantId}`,
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
    throw new Error(errorText || "Failed to update favorite restaurant.");
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
