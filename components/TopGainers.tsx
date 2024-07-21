import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

interface TopGainersProps {
    stockData: {
        top_gainers: {
            ticker: string;
            change_percentage: string;
            price: string;
            change_amount: string;
            volume: number;
        }[];
    };
    index: number;
}

// Function to format numbers with K and M suffixes
const formatNumber = (num: number | null) => {
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

const TopGainers: React.FC<TopGainersProps> = ({ stockData, index }) => {
    if (!stockData || !stockData.top_gainers) {
        return <Text>No data available</Text>; // Error handling if stockData is null or missing top_gainers
    }

    const router = useRouter();

    const handlePress = () => {
        console.log(
            "Pressed on top gainer: /info?ticker=" +
                stockData.top_gainers[index].ticker
        );
        router.push(`/info?ticker=${stockData.top_gainers[index].ticker}`);
    };

    const topGainer = stockData.top_gainers[index];

    if (!topGainer) {
        return null; // or some placeholder or error handling
    }

    return (
        <View className="bg-gray-900 px-4 py-2 w-full border-b border-gray-600 flex flex-row items-center justify-between">
            <View>
                <View className="flex flex-row gap-3">
                    <Text className="text-xl text-white font-bold">
                        {topGainer.ticker}
                    </Text>
                    <Text className="text-xl text-green-300 font-bold">
                        +{topGainer.change_percentage}
                    </Text>
                </View>
                <View className="flex flex-row gap-3">
                    <Text className="text-lg text-white font-semibold">
                        {topGainer.price}
                        <Text className="text-md text-gray-400">
                            {" "}
                            + {topGainer.change_amount}
                        </Text>
                    </Text>
                    <Text className="text-lg text-white font-semibold">
                        VOL: {formatNumber(topGainer.volume)}
                    </Text>
                </View>
            </View>
            <View className="flex flex-row items-center">
                <TouchableOpacity>
                    <Image
                        source={require("../assets/icons/newspaper.png")}
                        className="h-6 w-6 mr-8"
                        resizeMode="cover"
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handlePress}>
                    <Image
                        source={require("../assets/icons/info.png")}
                        className="h-8 w-8"
                        resizeMode="cover"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopGainers;
