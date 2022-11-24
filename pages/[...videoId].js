/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import fetchData from "../utils/fetch";
import Image from "next/image";
import Link from "next/link";
import moment from "moment/moment";
import { ThreeDots } from "react-loader-spinner";

const Video = () => {
    const router = useRouter();
    const { videoId } = router.query;
    console.log(videoId);
    const [videoDetail, setVideoDetail] = useState(null);
    const [relatedVideos, setRelatedVideos] = useState(null);
    const [videoComments, setVideoComments] = useState(null);
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         setVideoDetail(JSON.parse(localStorage.getItem("video")));
    //         setRelatedVideos(JSON.parse(localStorage.getItem("relatedVideos")));
    //         setVideoComments(JSON.parse(localStorage.getItem("videoComments")));
    //     }
    // }, []);
    useEffect(() => {
        if (videoId) {
            async function fetchVideo() {
                const videoQuery = await fetchData(
                    `videos?part=contentDetails,snippet,statistics&id=${videoId[0]}`
                );
                setVideoDetail(videoQuery);
                localStorage.setItem("video", JSON.stringify(videoQuery));

                const relatedQuery = await fetchData(
                    `search?part=id,snippet&relatedToVideoId=${videoId[0]}&maxResults=50`
                );
                setRelatedVideos(relatedQuery);
                localStorage.setItem(
                    "relatedVideos",
                    JSON.stringify(relatedQuery)
                );

                const commentQuery = await fetchData(
                    `commentThreads?part=snippet&videoId=${videoId[0]}&maxResults=50`
                );
                setVideoComments(commentQuery);
                localStorage.setItem(
                    "videoComments",
                    JSON.stringify(commentQuery)
                );
            }
            fetchVideo();
        }
    }, [videoId]);

    console.log(videoDetail);
    console.log(videoComments);
    console.log(relatedVideos);

    let details;
    if (videoDetail) {
        details = videoDetail.items[0].snippet;
        console.log(details);
    }

    return (
        <div className=" bg-[#0e0e0f] min-h-screen p-6 flex gap-6 text-white relative overflow-x-hidden">
            {videoDetail && videoDetail.items && details && videoComments ? (
                <div className="  w-[100%] flex flex-col gap-4">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${videoDetail.items[0].id}`}
                        controls={true}
                        width="100%"
                        height="30rem"
                    />
                    <div>
                        <p className=" text-3xl">{details.title}</p>
                        <p>{details.channelTitle}</p>
                    </div>
                    <div className=" bg-[#272727] min-h-[200px] p-4 rounded-lg">
                        <p>
                            {moment(details.publishedAt).format("Do MMMM YYYY")}
                        </p>
                        <p className=" mt-6 text-left">{details.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-20">
                        {videoComments &&
                            videoComments.items &&
                            videoComments.items.map((comment, index) => {
                                return (
                                    <div key={index}>
                                        <div className=" bg-[#272727] min-h-[100px]  p-4 rounded-lg flex gap-10">
                                            <img
                                                src={
                                                    comment.snippet
                                                        .topLevelComment.snippet
                                                        .authorProfileImageUrl
                                                }
                                                className=" rounded-full w-10 h-10"
                                            />
                                            <div>
                                                <div className="flex items-center gap-4 mb-2">
                                                    <p className=" text-xl text-gray-300">
                                                        {
                                                            comment.snippet
                                                                .topLevelComment
                                                                .snippet
                                                                .authorDisplayName
                                                        }
                                                    </p>
                                                    <p className=" text-xs text-gray-500">
                                                        {moment(
                                                            comment.snippet
                                                                .topLevelComment
                                                                .snippet
                                                                .publishedAt
                                                        ).format(
                                                            "Do MMMM YYYY"
                                                        )}
                                                    </p>
                                                </div>
                                                <p>
                                                    {
                                                        comment.snippet
                                                            .topLevelComment
                                                            .snippet.textDisplay
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <ThreeDots
                    height="50"
                    width="100vw"
                    radius="2"
                    color="#4fa94d"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            )}
            <div className=" flex flex-col items-center gap-4">
                <h2 className=" text-white text-2xl">Related Videos</h2>
                {relatedVideos &&
                    relatedVideos.items.map((video, index) => {
                        return (
                            <div
                                key={index}
                                className=" cursor-pointer w-52 bg-[#272727] p-2 rounded-lg flex flex-col gap-2 text-gray-300"
                            >
                                <Link href={`/${video.id.videoId}`}>
                                    <img
                                        src={
                                            video.snippet.thumbnails.default.url
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
    );
};

export default Video;
