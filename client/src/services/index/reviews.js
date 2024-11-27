import config from "@config/config.js";

export const createNewReview = async ({
  token,
  desc,
  slug,
  parent,
  replyOnUser,
}) => {
  try {
    const response = await fetch(`${config.API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        desc,
        slug,
        parent,
        replyOnUser,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error creating review.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

export const updateReview = async ({ token, desc, check, reviewId }) => {
  try {
    const response = await fetch(`${config.API_URL}/reviews/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        desc,
        check,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error updating review.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
export const deleteReview = async ({ token, reviewId }) => {
  try {
    const response = await fetch(`${config.API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error deleting review.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
export const getAllReviews = async (
  token,
  searchKeyword = "",
  page = 1,
  limit = 10
) => {
  try {
    const response = await fetch(
      `${config.API_URL}/reviews?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error fetching reviews.");
    }

    const { data, headers } = await response.json();
    return { data, headers };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
