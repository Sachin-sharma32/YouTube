/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import fetchData from "../../utils/fetch";
import Image from "next/image";
import { Button } from "@mui/material";
import Link from "next/link";

const Channel = () => {
    const [channelDetails, setChannelDetails] = useState(null);
    const [channelVideos, setChannelVideos] = useState(null);
    const router = useRouter();
    const { channelId } = router.query;

    // useEffect(() => {
    //     setChannelDetails(JSON.parse(localStorage.getItem("channel")));
    //     setChannelVideos(JSON.parse(localStorage.getItem("channelVideos")));
    // }, []);

    useEffect(() => {
        async function fetchDetails() {
            const data = await fetchData(
                `channels?part=snippet&id=${channelId}`
            );
            setChannelDetails(data);
            localStorage.setItem("channel", JSON.stringify(data));

            const channelVideo = await fetchData(
                `search?channelId=${channelId}&part=snippet,id&order=date&maxResults=50`
            );
            setChannelVideos(channelVideo)
            localStorage.setItem('channelVideos', JSON.stringify(channelVideo))
        }
        fetchDetails();
    }, [channelId]);

    console.log(channelVideos);

    const numberFormat = () => {
        if (channelDetails.items[0].statistics.subscriberCount >= 1000) {
            return (
                (
                    channelDetails.items[0].statistics.subscriberCount / 1000
                ).toFixed(1) + "K"
            );
        } else if (
            channelDetails.items[0].statistics.subscriberCount >= 1000000
        ) {
            return (
                channelDetails.items[0].statistics.subscriberCount.toFixed(1) +
                "M"
            );
        } else {
            return channelDetails.items[0].statistics.subscriberCount;
        }
    };

    console.log(channelDetails);

    return (
        <div>
            {channelDetails && channelDetails.items && (
                <div className=" bg-[#0f0f0f] min-h-screen text-white">
                    <img
                        src={
                            channelDetails.items[0].brandingSettings.image
                                .bannerExternalUrl
                        }
                        alt=""
                        className=" w-full h-[400px]"
                    />
                    <div className=" w-[70%] mx-auto mt-6 flex flex-col items-center justify-center">
                        <div className=" w-[70%] mx-auto mt-4 flex justify-between items-center ">
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        channelDetails.items[0].snippet
                                            .thumbnails.high.url
                                    }
                                    alt=""
                                    className=" w-20 rounded-full"
                                />
                                <div>
                                    <h2 className=" text-white">
                                        {channelDetails.items[0].snippet.title}
                                    </h2>
                                    <h2>
                                        {numberFormat()}
                                        <span className=" ml-2">
                                            Subscribers
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <Button className=" bg-red-500 text-white hover:bg-red-600">
                                Subscribe
                            </Button>
                        </div>
                        <div className=" grid grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                            {channelVideos &&
                                channelVideos.items.map((video, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className=" cursor-pointer w-52 bg-[#272727] p-2 rounded-lg flex flex-col gap-2 text-gray-300"
                                        >
                                            <Link href={`/${video.id.videoId}`}>
                                                <img
                                                    src={
                                                        video.snippet.thumbnails
                                                            .default.url
                                                    }
                                                    alt=""
                                                    className=" w-60 rounded-lg"
                                                />
                                            </Link>
                                            <p className=" text-xs">
                                                {video.snippet.title}
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Channel;
