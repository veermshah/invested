import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import TopGainers from "@/components/TopGainers";
import TopLosers from "@/components/TopLosers";
import MostActive from "@/components/MostActive";

const API_KEY = "demo";
// const API_KEY = "YMMDG61FF0VTDB0D";
const URL = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`;

// Function to format numbers with K and M suffixes
const formatNumber = (num) => {
    if (num == null) {
        // Handle undefined or null values
        return "N/A"; // You can return a default value or an empty string
    }

    if (num >= 1000000) {
        // Round to the nearest integer and append 'M'
        return `${Math.round(num / 1000000)}M`;
    } else if (num >= 1000) {
        // Round to the nearest integer and append 'K'
        return `${Math.round(num / 1000)}K`;
    } else {
        // Return the number as-is
        return num.toString();
    }
};

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
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    return (
        <ScrollView>
            <View className="mt-10">
                <Text className="mt-5 ml-5 mb-3 text-2xl text-white font-pbold">
                    Top Gainers
                </Text>

                <TopGainers stockData={stockData} index={0} />
                <TopGainers stockData={stockData} index={1} />
                <TopGainers stockData={stockData} index={2} />
                <TopGainers stockData={stockData} index={3} />
                <TopGainers stockData={stockData} index={4} />

                <Text className="mt-5 ml-5 mb-3 text-2xl text-white font-pbold">
                    Top Losers
                </Text>
                <TopLosers stockData={stockData} index={0} />
                <TopLosers stockData={stockData} index={1} />
                <TopLosers stockData={stockData} index={2} />
                <TopLosers stockData={stockData} index={3} />
                <TopLosers stockData={stockData} index={4} />

                <Text className="mt-5 ml-5 mb-3 text-2xl text-white font-pbold">
                    Most Traded (USA)
                </Text>
                <MostActive stockData={stockData} index={0} />
                <MostActive stockData={stockData} index={1} />
                <MostActive stockData={stockData} index={2} />
                <MostActive stockData={stockData} index={3} />
                <MostActive stockData={stockData} index={4} />
            </View>
        </ScrollView>
    );
}
