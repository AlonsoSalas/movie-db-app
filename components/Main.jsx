import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { fetchMovies } from "../lib/theMovieDb";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MovieCard, AnimatedMovieCard } from "./MovieCard";
import { Logo } from "./Logo";

export function Main() {
  const [movies, setMovies] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    fetchMovies().then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      {/* navbar */}
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
    </View>
  );
}
