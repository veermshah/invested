import React from "react";
import { View, Text } from "react-native";

interface MostActiveProps {
    stockData: {
        most_actively_traded: {
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

const MostActive: React.FC<MostActiveProps> = ({ stockData, index }) => {
    if (!stockData || !stockData.most_actively_traded) {
        return <Text>No data available</Text>; // Error handling if stockData is null or missing top_gainers
    }
    const topGainer = stockData.most_actively_traded[index];

    if (!topGainer) {
        return null; // or some placeholder or error handling
    }

    // Determine text color based on change_percentage
    const changePercentageColor =
        parseFloat(topGainer.change_percentage) >= 0
            ? "text-green-300"
            : "text-red-500";

    return (
        <View className="bg-gray-900 px-2 py-2 w-full border-b border-gray-600">
            <View className="flex flex-row gap-3">
                <Text className="text-xl text-white font-bold">
                    {topGainer.ticker}
                </Text>
                <Text className={`text-xl ${changePercentageColor} font-bold`}>
                    {topGainer.change_percentage}
                </Text>
            </View>
            <View className="flex flex-row gap-3">
                <Text className="text-lg text-white font-semibold">
                    {topGainer.price}
                    <Text className="text-md text-gray-400">
                        {" "}
                        - {Math.abs(topGainer.change_amount)}
                    </Text>
                </Text>
                <Text className="text-lg text-white font-semibold">
                    VOL: {formatNumber(topGainer.volume)}
                </Text>
            </View>
        </View>
    );
};

export default MostActive;
