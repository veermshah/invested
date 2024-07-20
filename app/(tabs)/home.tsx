import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
    return (
        <SafeAreaView>
                        <ScrollView contentContainerStyle={{ height: "100%" }}>

            <View className="mt-5 ml-5">
                <Text className="text-2xl text-white font-pblack">
                    Top Stocks Today
                </Text>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}
