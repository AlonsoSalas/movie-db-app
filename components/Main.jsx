import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { fetchMovies } from "../lib/theMovieDb";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MovieCard } from "./MovieCard";
import { Screen } from "./Screen";
import uniqBy from "lodash/uniqBy";

export function Main() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (nextPage = 1) => {
    if (loading || nextPage > totalPages) return;

    setLoading(true);

    const {
      movies: newMovies,
      page: currentPage,
      totalPages: fetchedTotalPages,
    } = await fetchMovies(nextPage);

    setMovies((prevMovies) => uniqBy([...prevMovies, ...newMovies], "id"));
    setPage(currentPage);
    setTotalPages(fetchedTotalPages);

    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <Screen>
      {movies.length === 0 && loading ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(movie) => movie.id.toString()}
          numColumns={2}
          renderItem={({ item }) => <MovieCard movie={item} />}
          onEndReached={() => loadMovies(page + 1)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator color={"#fff"} size={"large"} /> : null
          }
        />
      )}
    </Screen>
  );
}
