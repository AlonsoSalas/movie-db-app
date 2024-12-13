import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { fetchMovies } from "../lib/theMovieDb";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MovieCard } from "./MovieCard";
import { Screen } from "./Screen";

export function Main() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <Screen>
      {movies.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(movie) => movie.id}
          numColumns={2}
          renderItem={({ item }) => <MovieCard movie={item} />}
        />
      )}
    </Screen>
  );
}
