import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";

const API_KEY = "demo";
// const API_KEY = "YMMDG61FF0VTDB0D";
const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

export default function App() {
    const [stockData, setStockData] = useState(null);
    useEffect(() => {
        fetch(URL, {
            method: "GET",
            headers: {
                "User-Agent": "request",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setStockData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{ height: "100%" }}>
                <View className="mt-5">
                    <Text className="ml-5 mb-3 text-2xl text-white font-pbold">
                        Top Gainers
                    </Text>
                    <View className="bg-gray-800 px-2 py-2 w-full border-b border-gray-600">
                        <View className="flex flex-row gap-3">
                            <Text className="text-xl text-white font-bold">
                                {stockData?.top_gainers[0].ticker}
                            </Text>
                            <Text className="text-xl text-green-300 font-bold">
                                +{stockData?.top_gainers[0].change_percentage}
                            </Text>
                        </View>
                        <View className="flex flex-row gap-3">
                            <Text className="text-lg text-white font-semibold">
                                {stockData?.top_gainers[0].price}
                                <Text className="text-md text-gray-400">
                                    {" "}
                                    + {stockData?.top_gainers[0].change_amount}
                                </Text>
                            </Text>
                            <Text className="text-lg text-white font-semibold">
                                VOL: {stockData?.top_gainers[0].volume}
                            </Text>
                        </View>
                    </View>
                    <View className="bg-gray-800 px-2 py-2 w-full border-b border-gray-600">
                        <View className="flex flex-row gap-3">
                            <Text className="text-xl text-white font-bold">
                                {stockData?.top_gainers[1].ticker}
                            </Text>
                            <Text className="text-xl text-green-300 font-bold">
                                +{stockData?.top_gainers[1].change_percentage}
                            </Text>
                        </View>
                        <View className="flex flex-row gap-3">
                            <Text className="text-lg text-white font-semibold">
                                {stockData?.top_gainers[1].price}
                                <Text className="text-md text-gray-400">
                                    {" "}
                                    + {stockData?.top_gainers[1].change_amount}
                                </Text>
                            </Text>
                            <Text className="text-lg text-white font-semibold">
                                VOL: {stockData?.top_gainers[1].volume}
                            </Text>
                        </View>
                    </View>
                    
                    <Text className="text-2xl text-white font-pbold">
                        Top Losers
                    </Text>
                    <Text className="text-2xl text-white font-pbold">
                        Most Traded (USA)
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
