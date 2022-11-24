import React from "react";
import fetchData from "../utils/fetch";
import { useEffect, useState } from "react";
import VideoDetail from "./VideoDetail";
import { useSelector } from "react-redux";

const Feed = () => {
    const category = useSelector((state)=>state.base.category)
    const search = useSelector((state)=>state.base.search)
    console.log(category)
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        const fetching = async () => {
            const data = await fetchData(
                `search?part=snippet&q=${category},${search}`
            );
            const videoList = data.items;
            setVideos(videoList);
        };
        fetching();
    }, [category,search]);
    
    return (
        <div className=" bg-[#181818] px-10 pt-4 text-white text-center min-h-screen mt-[64px]">
            <h1 className=" text-3xl text-white">
                {category}
                <span className=" text-red-500 ml-4">Videos</span>
            </h1>
            <div className=" mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-x-6 gap-y-12">
              {videos.map((video,index)=>(
                  <VideoDetail key={index} video={video}/>
              ))}
            </div>
        </div>
    );
};

export default Feed;
