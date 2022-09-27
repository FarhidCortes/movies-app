import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { RootStackParams } from "../navigation/Navigation";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { MovieDetails } from "../components/MovieDetails";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height: screenHeight } = Dimensions.get("window");

interface Props extends StackScreenProps<RootStackParams, "DetailScreen"> {}

export const DetailScreen = ({ route, navigation }: Props) => {
    const movie = route.params;
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    const { isLoading, cast, movieFull } = useMovieDetails(movie.id);
    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.imageBorder}>
                    <Image source={{ uri }} style={styles.posterImage} />
                </View>
            </View>
            <View style={styles.marginContainer}>
                <Text style={styles.subtitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            {isLoading ? (
                <ActivityIndicator
                    size={35}
                    color="grey"
                    style={{ marginTop: 20 }}
                />
            ) : (
                <MovieDetails movieFull={movieFull!} cast={cast} />
            )}
            {/* Boton para cerrar */}
            <View style={styles.backbutton}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.pop();
                    }}
                >
                    <Icon name="arrow-back-outline" color="white" size={60} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    posterImage: {
        flex: 1,
    },
    imageContainer: {
        width: "100%",
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subtitle: {
        color: "black",
        opacity: 0.8,
        fontSize: 16,
    },
    title: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
    },
    imageBorder: {
        flex: 1,
        overflow: "hidden",
        borderBottomEndRadius: 25,
        borderBottomStartRadius: 25,
    },
    backbutton: {
        position: "absolute",
        zIndex: 999,
        elevation: 9,
        top: 30,
        left: 10,
    },
});
