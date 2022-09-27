import React from "react";
import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Cast } from "../interfaces/creditsInterface";
import { MovieFull } from "../interfaces/movieInterface";
import currencyFormatter from "currency-formatter";
import { CastItem } from "./CastItem";

interface Props {
    movieFull: MovieFull;
    cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <View style={{ marginHorizontal: 20 }}>
            <View style={{ flexDirection: "row" }}>
                <Icon name="rocket" color="grey" size={16} />
                <Text style={{ color: "black" }}>{movieFull.vote_average}</Text>
                <Text>-{movieFull.genres.map((g) => g.name).join(", ")}</Text>
            </View>
            <Text
                style={{
                    color: "black",
                    fontSize: 23,
                    marginTop: 10,
                    fontWeight: "bold",
                }}
            >
                Historia
            </Text>
            <Text style={{ color: "black", fontSize: 16 }}>
                {movieFull.overview}
            </Text>
            <Text
                style={{
                    color: "black",
                    fontSize: 23,
                    marginTop: 10,
                    fontWeight: "bold",
                }}
            >
                Presupuesto
            </Text>
            <Text style={{ color: "black", fontSize: 18 }}>
                {currencyFormatter.format(movieFull.budget, { code: "USD" })}
            </Text>

            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text
                    style={{
                        color: "black",
                        fontSize: 23,
                        marginTop: 10,
                        fontWeight: "bold",
                        marginHorizontal: 20,
                    }}
                >
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CastItem actor={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginTop: 10, height: 70 }}
                />
            </View>
        </View>
    );
};
