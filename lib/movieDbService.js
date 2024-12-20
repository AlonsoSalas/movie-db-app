const API_URL = "https://api.themoviedb.org/3/movie/popular?language=en-US";
const MOVIE_DETAILS_URL = "https://api.themoviedb.org/3/movie";

const apiKey = process.env.EXPO_PUBLIC_API_ACCESS_TOKEN;

const API_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${apiKey}`,
};

/**
 * Constructs the complete URI for a movie poster.
 * @param {string} posterPath - The relative poster path returned by the API.
 * @param {string} size - The desired image size (e.g., "w185", "original"). Defaults to "w185".
 * @returns {string} The complete URL for the movie poster.
 */
export function constructPosterUrl(posterPath, size = "w185") {
  const BASE_URL = "https://image.tmdb.org/t/p/";
  return `${BASE_URL}${size}${posterPath}`;
}

/**
 * Fetches a list of popular movies from the API.
 * @param {number} page The page number to fetch.
 * @returns {Promise<Object>} A promise resolving to an object containing movies and pagination data.
 */
export async function fetchMovies(page = 1) {
  try {
    const response = await fetch(`${API_URL}&page=${page}`, {
      headers: API_HEADERS,
    });

    const data = await response.json();

    if (data && Array.isArray(data.results)) {
      return {
        movies: data.results,
        page: data.page,
        totalPages: data.total_pages,
      };
    }

    console.warn("No movies found in the response.");
    return { movies: [], page: 0, totalPages: 0 };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { movies: [], page: 0, totalPages: 0 };
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
