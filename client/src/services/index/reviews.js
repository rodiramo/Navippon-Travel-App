import config from "@config/config.js";

export const createNewReview = async ({
  token,
  rating,
  title,
  desc,
  experienceId,
}) => {
  const response = await fetch(`${config.API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      rating: rating,
      title: title,
      desc: desc,
      experienceId,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error creating review: ${response.statusText}`);
  }

  return response.json();
};

export const updateReview = async ({
  token,
  rating,
  title,
  desc,
  reviewId,
}) => {
  try {
    const response = await fetch(`${config.API_URL}/reviews`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reviewId,
        rating: rating,
        title: title,
        desc: desc,
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
    const response = await fetch(`${config.API_URL}/reviews`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // Ensure Content-Type is set
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        reviewId: reviewId, // Ensure the reviewId is passed in the body
      }),
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
