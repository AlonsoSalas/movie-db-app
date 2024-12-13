import { View, StyleSheet, Image } from "react-native";

/**
 * Constructs the complete URI for a movie poster.
 * @param {string} posterPath - The relative poster path returned by the API.
 * @param {string} size - The desired image size (e.g., "w185", "original"). Defaults to "w185".
 * @returns {string} The complete URL for the movie poster.
 */
function constructPosterUrl(posterPath, size = "w185") {
  const BASE_URL = "https://image.tmdb.org/t/p/";
  return `${BASE_URL}${size}${posterPath}`;
}

export function MovieCard({ movie }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: constructPosterUrl(movie.poster_path) }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    aspectRatio: 2 / 3,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
