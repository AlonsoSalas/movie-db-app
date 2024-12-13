import {
  constructPosterUrl,
  fetchMovies,
  fetchMovieDetails,
} from "./movieDbService";

global.fetch = jest.fn();

describe("movieDbService", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe("constructPosterUrl", () => {
    it("should construct a valid poster URL with default size", () => {
      const posterPath = "/poster123.jpg";
      const url = constructPosterUrl(posterPath);
      expect(url).toBe("https://image.tmdb.org/t/p/w185/poster123.jpg");
    });

    it("should construct a valid poster URL with a specified size", () => {
      const posterPath = "/poster123.jpg";
      const url = constructPosterUrl(posterPath, "original");
      expect(url).toBe("https://image.tmdb.org/t/p/original/poster123.jpg");
    });
  });

  describe("fetchMovies", () => {
    it("should fetch movies successfully", async () => {
      const mockResponse = {
        page: 1,
        results: [{ id: 1, title: "Mock Movie" }],
        total_pages: 10,
      };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetchMovies(1);

      expect(fetch).toHaveBeenCalledWith(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        expect.objectContaining({
          headers: expect.objectContaining({
            accept: "application/json",
          }),
        })
      );
      expect(result).toEqual({
        movies: mockResponse.results,
        page: mockResponse.page,
        totalPages: mockResponse.total_pages,
      });
    });

    it("should return an empty result on API error", async () => {
      fetch.mockRejectedValueOnce(new Error("API Error"));

      const result = await fetchMovies(1);

      expect(result).toEqual({ movies: [], page: 0, totalPages: 0 });
    });
  });

  describe("fetchMovieDetails", () => {
    it("should fetch movie details successfully", async () => {
      const movieId = 123;
      const mockResponse = { id: movieId, title: "Mock Movie Details" };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await fetchMovieDetails(movieId);

      //   expect(fetch).toHaveBeenCalledWith(
      //     `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      //     {
      //       headers: {
      //         accept: "application/json",
      //         Authorization: `Bearer mock_api_key`,
      //       },
      //     }
      //   );

      expect(fetch).toHaveBeenCalledWith(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        expect.objectContaining({
          headers: expect.objectContaining({
            accept: "application/json",
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("should return null for a non-existent movie ID", async () => {
      const movieId = 123;
      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: "Not Found",
      });

      const result = await fetchMovieDetails(movieId);

      expect(result).toBeNull();
    });

    it("should return null on fetch error", async () => {
      const movieId = 123;
      fetch.mockRejectedValueOnce(new Error("Fetch Error"));

      const result = await fetchMovieDetails(movieId);

      expect(result).toBeNull();
    });
  });
});
