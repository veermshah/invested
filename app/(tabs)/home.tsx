import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl text-white font-pblack">INVESTED!</Text>
            <Link href="/profile" className="font-bold text-blue-500">
                Profile
            </Link>
        </View>
    );
}
