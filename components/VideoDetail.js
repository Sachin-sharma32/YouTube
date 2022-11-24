import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CardMedia } from "@mui/material";

const VideoDetail = ({ video }) => {
    return (
        <div>
            <Link href={`/${video.id.videoId}`} >
                <div className="flex flex-col items-start text-left font-semibold cursor-pointer">
                    <CardMedia
                        image={video.snippet.thumbnails.high.url}
                        sx={{ width: 358, height: 180}}
                    />
                    <h4 className=" mt-4">{(video.snippet.title).slice(0,40)}...</h4>
                    <Link href={`/channel/${video.snippet.channelId}`} className=" text-xs text-gray-500">{video.snippet.channelTitle}</Link>
                </div>
            </Link>
        </div>
    );
};

export default VideoDetail;
