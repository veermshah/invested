import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import TradingViewWidget from "@/components/TradingViewWidget";

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

const info = () => {
    const { ticker } = useGlobalSearchParams(); // Extract the ticker parameter
    console.log("Ticker:", ticker);
    const [data, setData] = useState(null);
    const [metricData, setMetricData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const API_KEY = "lgcXX0PHRKKvFNuhbKQ1dSsOFODym1ky"; // replace with your actual API key
    const url = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${API_KEY}`;
    const urlMetric = `https://financialmodelingprep.com/api/v3/quote/${ticker}?apikey=${API_KEY}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "User-Agent": "request",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
                console.log("Result__", result);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        const fetchMetricData = async () => {
            try {
                const response = await fetch(urlMetric, {
                    method: "GET",
                    headers: {
                        "User-Agent": "request",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                setMetricData(result);
                console.log("Result__", result);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
        fetchMetricData();
    }, []);

    return (
        <ScrollView className="bg-gray-900 p-5">
            <View>
                {error && <Text className="text-red-500">Error: {error}</Text>}
                {data && metricData ? (
                    <ScrollView>
                        <View className="mt-10">
                            <View className="flex w-full mb-5 items-center">
                                <Image
                                    source={{
                                        uri: data[0].image,
                                    }}
                                    className="h-72 w-72 rounded-xl "
                                    resizeMode="cover" // Maintain aspect ratio without distortion
                                />
                            </View>
                            <Text className="text-white text-2xl font-pbold">
                                {ticker}: {data[0].companyName}
                            </Text>
                            <View className="flex flex-row justify-between">
                                <Text className="text-secondary font-pbold text-xl">
                                    {data[0].exchange}
                                </Text>
                                <Text className="text-secondary font-pbold text-xl">
                                    {data[0].country}/{data[0].currency}
                                </Text>
                            </View>
                            <Text className="text-white font-pmedium text-lg">
                                Sector: {data[0].sector}
                            </Text>
                            <Text className="text-white font-pmedium text-lg">
                                Industry: {data[0].industry}
                            </Text>
                            <Text className="text-white font-pmedium text-lg">
                                Headquartered: {data[0].city}, {data[0].state}
                            </Text>
                            <View className="border border-gray-400 my-4"></View>
                            <Text className="text-white font-pmedium text-md">
                                {data[0].description}
                            </Text>
                            <View className="border border-gray-400 my-4"></View>
                            <View className="flex flex-row justify-between">
                                <View className="flex flex-column bg-gray-200 rounded-full w-24 h-36 items-center justify-center">
                                    <Text className="font-pblack text-md text-center">
                                        Market Cap
                                    </Text>
                                    <Text className="font-pblack text-secondary text-md">
                                        {formatNumber(metricData[0].marketCap)}
                                    </Text>
                                </View>
                                <View className="flex flex-column bg-gray-200 rounded-full w-24 h-36 items-center justify-center">
                                    <Text className="font-pblack text-md text-center">
                                        Volume
                                    </Text>
                                    <Text className="font-pblack text-secondary text-md">
                                        {formatNumber(metricData[0].volume)}
                                    </Text>
                                </View>
                                {metricData[0].pe == null ? (
                                    <View className="flex flex-column bg-gray-200 rounded-full w-24 h-36 items-center justify-center">
                                        <Text className="font-pblack text-md text-center">
                                            %Change
                                        </Text>
                                        <Text className="font-pblack text-secondary text-md">
                                            {metricData[0].changesPercentage}
                                        </Text>
                                    </View>
                                ) : (
                                    <View className="flex flex-column bg-gray-200 rounded-full w-24 h-36 items-center justify-center">
                                        <Text className="font-pblack text-md text-center">
                                            PE Ratio
                                        </Text>
                                        <Text className="font-pblack text-secondary text-md">
                                            {metricData[0].pe}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <Text className="text-white">Loading...</Text>
                )}
            </View>
            <View className="my-10 flex items-center">
            <TradingViewWidget />
            </View>
        </ScrollView>
    );
};

export default info;
