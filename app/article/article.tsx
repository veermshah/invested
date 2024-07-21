import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { set } from "date-fns";

const getCurrentFormattedDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
};
const currentDate = getCurrentFormattedDate();

const Article = () => {
    const { title, description, image, author, publishedAt, source, url } =
        useGlobalSearchParams();
    const [content, setContent] = React.useState("");

    console.log("URL: ", url);
    const options = { method: "GET", headers: { accept: "application/json" } };
    const apiURL = `https://api.diffbot.com/v3/article?url=${url}&token=464d5bced970787e28e15d22b5a6017a&paging=false`;
    useEffect(() => {
        fetch(
            `https://api.diffbot.com/v3/article?url=${url}&token=464d5bced970787e28e15d22b5a6017a&paging=false`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                {
                    console.log("DESCRIPTION: ", content);
                }

                console.log(
                    "CONTENT__________***********:",
                    response.objects[0].text
                );
                setContent(response.objects[0].text);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <ScrollView className="bg-gray-900">
            <View className="mt-10 ">
                {publishedAt == undefined ? (
                    <Text className="text-secondary font-pbold mx-5 mt-5">
                        {currentDate}
                    </Text>
                ) : (
                    <Text className="text-secondary font-pbold mx-5 mt-5">
                        {publishedAt}
                    </Text>
                )}
                <Text className=" mx-5 text-2xl text-white font-pbold">
                    {title}
                </Text>
                <Image
                    source={{ uri: image }}
                    className="h-96 w-auto mx-5 my-2 rounded-3xl"
                />
                {content == "" ? (
                    <View>
                        <ActivityIndicator size="large" color="#FF9C01" />
                    </View>
                ) : (
                    <Text className="text-white font-pregular mx-5 my-2">
                        {content}
                    </Text>
                )}

                {source == undefined ? (
                    ""
                ) : (
                    <Text className="text-secondary font-psemibold mx-5">
                        {source}
                    </Text>
                )}
                {author == undefined ? (
                    ""
                ) : (
                    <Text className="text-secondary font-psemibold mx-5">
                        {author}
                    </Text>
                )}
                <View className="h-24"></View>
            </View>
        </ScrollView>
    );
};

export default Article;
