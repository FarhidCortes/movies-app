import React, { useContext, useEffect } from "react";
import Carousel from "react-native-snap-carousel";
import { View, ActivityIndicator, Dimensions, ScrollView } from "react-native";
import { useMovies } from "../hooks/useMovies";
import { MoviePoster } from "../components/MoviePoster";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HorizontalSlider } from "../components/HorizontalSlider";
import { GradientBackground } from "../components/GradientBackground";
import { getImageColors } from "../helpers/getColors";
import { GradientContext } from "../context/GradientContext";
const { width: windowWidth } = Dimensions.get("window");

export const HomeScreen = () => {
    const { nowPlaying, popular, topRated, upcomming, isLoading } = useMovies();

    const { setMainColors } = useContext(GradientContext);

    const { top } = useSafeAreaInsets();

    useEffect(() => {
        if (nowPlaying.length > 0) {
            getPosterColors(0);
        }
    }, [nowPlaying]);

    const getPosterColors = async (index: number) => {
        const movie = nowPlaying[index];
        const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        const [primary = "green", secondary = "orange"] = await getImageColors(
            uri
        );
        setMainColors({ primary, secondary });
    };

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                }}
            >
                <ActivityIndicator color="red" size={100}></ActivityIndicator>
            </View>
        );
    }

    return (
        <GradientBackground>
            <ScrollView>
                <View style={{ marginTop: top + 20 }}>
                    {/* Carousel Principal*/}
                    <View style={{ height: 440 }}>
                        <Carousel
                            data={nowPlaying}
                            renderItem={({ item }: any) => (
                                <MoviePoster movie={item} />
                            )}
                            sliderWidth={windowWidth}
                            itemWidth={300}
                            inactiveSlideOpacity={0.9}
                            onSnapToItem={(index) => getPosterColors(index)}
                        />
                    </View>

                    {/* Peliculas Populares */}
                    <HorizontalSlider title="Populares" movies={popular} />
                    <HorizontalSlider
                        title="Mejores Evaluadas"
                        movies={topRated}
                    />
                    <HorizontalSlider title="Proximas" movies={upcomming} />
                </View>
            </ScrollView>
        </GradientBackground>
    );
};
