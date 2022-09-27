import React, { useRef } from "react";
import { Animated, Button, View } from "react-native";
import { useFade } from "../hooks/useFade";

export const FadeScreen = () => {
    const { opacity, fadeIn, fadeOut } = useFade();

    return (
        <View
            style={{
                backgroundColor: "grey",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Animated.View
                style={{
                    backgroundColor: "#084f6a",
                    width: 150,
                    height: 150,
                    borderColor: "white",
                    borderWidth: 10,
                    opacity: opacity,
                }}
            ></Animated.View>
            <Button title="Fide In" onPress={fadeIn} />
            <Button title="Fade Out" onPress={fadeOut} />
        </View>
    );
};
