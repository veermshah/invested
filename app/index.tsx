import { ScrollView, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Text className="text-5xl text-secondary font-bold">
                        INdVESdTdED!
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default index;
