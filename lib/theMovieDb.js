const API_URL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie";

const API_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
};

/**
 * Fetches a list of popular movies from the API.
 * @returns {Promise<Object[]>} A promise resolving to an array of movie objects.
 */
export async function fetchMovies() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: API_HEADERS,
    });

    const data = await response.json();

    if (data && Array.isArray(data.results)) {
      return data.results;
    }

    console.warn("No movies found in the response.");
    return [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

/**
 * Fetches details of a specific movie by its ID.
 * @param {number|string} movieId - The ID of the movie to fetch details for.
 * @returns {Promise<Object|null>} A promise resolving to the movie details object or null if an error occurs.
 */
export async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${MOVIE_DETAILS_URL}/${movieId}?language=en-US`,
      { headers: API_HEADERS }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch details for movie ID ${movieId}:`,
        response.statusText
      );
      return null;
    }

    const data = await response.json();

    if (data) {
      return data;
    }

    console.warn("No details found for the specified movie ID.");
    return null;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
}
