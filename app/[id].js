import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { constructPosterUrl, fetchMovieDetails } from "../lib/movieDbService";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function Detail() {
  const { id } = useLocalSearchParams();

  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMovieDetails(id).then((movie) => {
        setMovieInfo(movie);
      });
    }
  }, [id]);

  return (
    <View className="bg-white flex-1">
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitle: "",
          headerTintColor: "white",
          headerTitle: () => (
            <Text className="text-white text-xl font-bold">Movie details</Text>
          ),
          headerLeft: () => {},
        }}
      />
      {movieInfo === null ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <View>
          <View className="w-full">
            <Text className="text-xl font-bold pt-3 pb-3 pl-2 bg-[#746a64] text-white">
              {movieInfo.title}
            </Text>
          </View>
          <View className="m-3 w-full flex-row bg-white rounded-lg shadow-md overflow-hidden">
            <View style={{ width: "30%" }}>
              <Image
                source={{ uri: constructPosterUrl(movieInfo.poster_path) }}
                style={{ width: "100%", height: 200 }}
                resizeMode="cover"
              />
            </View>

            {/* Column 2: Movie Info */}
            <View
              style={{
                flex: "col",
                marginLeft: "10",
                width: "70%",
                padding: "5",
              }}
            >
              <Text className="text-xl mb-10 text-gray-600">
                {movieInfo.release_date}
              </Text>
              <Text className="font-bold text-sm mb-5 text-gray-600">
                {`${movieInfo.vote_average}/10`}
              </Text>
              <TouchableOpacity className="absolute bottom-0 mt-4 ml-11 mr-11 bg-[#746a64] rounded-lg p-2 align-middle">
                <Text className=" text-white font-medium">Add to Favorite</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="m-3 w-full">
            <Text className="text-sm text-gray-600">
              {`${movieInfo.overview}`}
            </Text>
          </View>

          <View style={styles.trailersSection}>
            <Text style={styles.trailerHeading}>Trailers</Text>
            <View style={styles.trailersContainer}>
              {/* Trailer 1 */}
              <StyledPressable className="active:opacity-70  active:border-white/50">
                <View style={styles.trailerBox}>
                  <Text style={styles.trailerText}>Trailer 1</Text>
                </View>
              </StyledPressable>

              {/* Trailer 2 */}
              <StyledPressable className="active:opacity-70  active:border-white/50">
                <View style={styles.trailerBox}>
                  <Text style={styles.trailerText}>Trailer 2</Text>
                </View>
              </StyledPressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    alignItems: "center",
    padding: 16,
  },
  movieDetailsSection: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: "hidden",
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  movieImage: {
    width: "30%",
    height: 200,
    resizeMode: "cover",
  },
  movieInfoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  movieDetailText: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 8,
  },
  buttonContainer: {
    alignSelf: "flex-start",
  },
  trailersSection: {
    width: "100%",
    maxWidth: 800,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  trailerHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 16,
  },
  trailersContainer: {
    flexDirection: "column",
  },
  trailerBox: {
    height: 50,
    backgroundColor: "#746a64",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  trailerText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
