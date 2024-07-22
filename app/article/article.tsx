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
import { min, set } from "date-fns";
import apikey from "../../apikey";
import OpenAI from "openai";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useState } from "react";
const getCurrentFormattedDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
};
const currentDate = getCurrentFormattedDate();

const Article = () => {
    const { title, description, image, author, publishedAt, source, url } =
        useGlobalSearchParams();
    const [content, setContent] = useState("");
    const [chatGPTResponse, setChatGPTResponse] = useState("");

    const options = { method: "GET", headers: { accept: "application/json" } };
    const apiURL = `https://api.diffbot.com/v3/article?url=${url}&token=464d5bced970787e28e15d22b5a6017a&paging=false`;
    const openAIKey = apikey.OPENAI_API_KEY;

    async function getChatGPTResponse(text) {
        console.log("Content2: ", text);
        const prompt = `Format and clean up this article. Remove anything that is not part of the paragraphs of the article. End in a complete sentence. Write at least 200 words: ${text}`;
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/completions",
                {
                    model: "gpt-3.5-turbo-instruct",
                    prompt: prompt,
                    max_tokens: 1000,
                    temperature: 0.5,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${openAIKey}`,
                    },
                }
            );

            console.log("CHATGPT: ", response.data.choices[0].text.trimStart());
            setChatGPTResponse(response.data.choices[0].text.trimStart());
        } catch (error) {
            console.error("Error making the API request:", error);
        }
    }

    useEffect(() => {
        fetch(
            `https://api.diffbot.com/v3/article?url=${url}&token=464d5bced970787e28e15d22b5a6017a&paging=false`,
            options
        )
            .then((response) => response.json())
            .then((response) => {
                const articleText = response.objects[0].text;
                setContent(articleText);
                console.log("Content: ", articleText);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (content) {
            getChatGPTResponse(content);
        }
    }, [content]);

    return (
        <ScrollView className="bg-gray-900">
            <View className="mt-10 ">
                {publishedAt == undefined ? (
                    <Text className="text-secondary font-pbold mx-5 mt-5 mb-4">
                        {currentDate}
                    </Text>
                ) : (
                    <Text className="text-secondary font-pbold mx-5 mt-5 mb-2">
                        {publishedAt}
                    </Text>
                )}
                <Text className=" mx-5 text-2xl text-white font-pbold">
                    {title}
                </Text>
                <Image
                    source={{ uri: image }}
                    className="h-96 w-auto mx-5 my-5 rounded-3xl"
                />
                {chatGPTResponse == "" ? (
                    <View className="py-5 flex flex-row items-center gap-3 justify-center">
                        <Text className="text-secondary text-xl font-pbold">
                            Content Loading
                        </Text>
                        <ActivityIndicator size="large" color="#FF9C01" />
                    </View>
                ) : (
                    <Text className="text-white font-pregular mx-5">
                        {chatGPTResponse}
                    </Text>
                )}
                <View className="border border-gray-400 my-4 mx-5"></View>


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
