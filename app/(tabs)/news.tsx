import {
    ScrollView,
    Text,
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { useRouter } from "expo-router";

const news = () => {
    const router = useRouter();

    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get the current date
    const currentDate = new Date();
    const newDate = subDays(currentDate, 15);
    const formattedDate = format(newDate, "yyyy-MM-dd");

    // Log the results
    console.log("Formatted Date:", formattedDate);

    const calculateDateDifference = (specificDateStr: string) => {
        // Convert the specific date string to a Date object
        const specificDate = new Date(specificDateStr);

        // Get the current date and time
        const currentDate = new Date();

        // Calculate the difference in milliseconds
        const timeDifference = specificDate.getTime() - currentDate.getTime();

        // Convert the difference into days and hours
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const millisecondsInAnHour = 1000 * 60 * 60;

        const daysDifference = Math.floor(timeDifference / millisecondsInADay);
        const hoursDifference = Math.floor(
            (timeDifference % millisecondsInADay) / millisecondsInAnHour
        );

        return [daysDifference, hoursDifference];
    };

    // Function to format the date
    const formatDate = (dateString: string | number | Date) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // const handlePress = () => {
    //     console.log(
    //         "Pressed on top gainer: /info?title=" + article.title
    //     );
    //     router.push(`/info?ticker=${article.title}`);
    // };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/everything?sortBy=popularity&searchIn=title,description&language=en&from=${formattedDate}&q=(investment OR stocks)&apiKey=57164dd4c34342aeb7d6cd5375d9551e`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data.articles); // Ensure you are setting the articles array
                setLoading(false);
                console.log("News Articles:", data.articles);
            } catch (err) {
                setError("Failed to load news");
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <ActivityIndicator size="large" color="#FF9C01" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-black">
                <Text className="text-red-500 text-lg">{error}</Text>
            </View>
        );
    }

    // Slice the first 20 articles from the array
    const subsetArticles = articles.slice(0, 40);

    return (
        <ScrollView>
            <View className="mt-10">
                <Text className="mt-5 ml-5 mb-3 text-2xl text-white font-pbold">
                    News
                </Text>
                {articles.length > 0 ? (
                    <>
                        {subsetArticles.map((article, index) =>
                            article.urlToImage == null ||
                            article.urlToImage.endsWith(".webp") ? (
                                ""
                            ) : (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        console.log(
                                            "DateOf:",
                                            formatDate(article.publishedAt),
                                            "Other:",
                                            article.publishedAt
                                        );
                                        router.push(
                                            `/article?author=${encodeURIComponent(
                                                article.author
                                            )}&title=${encodeURIComponent(
                                                article.title
                                            )}&description=${encodeURIComponent(
                                                article.description
                                            )}&url=${encodeURIComponent(
                                                article.url
                                            )}&image=${encodeURIComponent(
                                                article.urlToImage
                                            )}&publishedAt=${encodeURIComponent(
                                                formatDate(article.publishedAt)
                                            )}&source=${encodeURIComponent(
                                                article.source.name
                                            )}`
                                        );
                                    }}
                                >
                                    <View className="bg-gray-900 rounded-xl px-5 py-5 mb-3">
                                        <View className="flex flex-row justify-center">
                                            <View className="flex flex-col">
                                                <Text
                                                    className="text-white text-md font-pbold w-52 pr-3"
                                                    numberOfLines={3}
                                                    ellipsizeMode="tail"
                                                >
                                                    {article.title}
                                                </Text>
                                                <Text
                                                    className="text-gray-400 text-xs font-pregular w-52 pr-3 pt-1"
                                                    numberOfLines={5}
                                                    ellipsizeMode="tail"
                                                >
                                                    {article.description != null
                                                        ? article.description
                                                        : article.content}
                                                </Text>
                                            </View>
                                            {article.urlToImage == null ? (
                                                <Image
                                                    source={require("../../assets/placeholderImage.jpg")}
                                                    className="h-36 w-36 rounded-xl"
                                                    resizeMode="cover"
                                                />
                                            ) : (
                                                <Image
                                                    source={{
                                                        uri: article.urlToImage,
                                                    }}
                                                    className="h-36 w-36 rounded-xl"
                                                    resizeMode="cover" // Maintain aspect ratio without distortion
                                                />
                                            )}
                                        </View>
                                        <Text
                                            className="text-gray-400 text-md font-pmedium pt-4"
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {Math.abs(
                                                calculateDateDifference(
                                                    article.publishedAt
                                                )[0]
                                            )}{" "}
                                            days{" "}
                                            {article.author != null &&
                                            !article.author.includes("@") ? (
                                                <Text>• {article.author}</Text>
                                            ) : (
                                                ""
                                            )}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        )}
                    </>
                ) : (
                    <Text className="text-white">No articles available</Text>
                )}
            </View>
        </ScrollView>
    );
};

export default news;
