import { Link } from "expo-router";
import { styled } from "nativewind";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { constructPosterUrl } from "../lib/theMovieDb";

const StyledPressable = styled(Pressable);

export function MovieCard({ movie }) {
  return (
    <Link href={`/${movie.id}`} asChild>
      <StyledPressable className="flex-1 active:opacity-50  active:border-white/50">
        <View className="flex-row" style={styles.card}>
          <Image
            source={{ uri: constructPosterUrl(movie.poster_path) }}
            style={styles.image}
          />
        </View>
      </StyledPressable>
    </Link>
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
