import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CodeIcon from "@mui/icons-material/Code";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DataObjectIcon from "@mui/icons-material/DataObject";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SchoolIcon from "@mui/icons-material/School";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setToggle } from "../redux/slice";
import { useRouter } from "next/router";

const SideBar = () => {
    const dispatch = useDispatch();
    const toggle = useSelector((state) => state.base.toggle);
    const router = useRouter()

    return (
        <div className=" fixed top-0">
            {toggle && (
                <div className=" bg-[#212121] w-40 h-screen flex flex-col text-center text-white pt-10 relative close">
                    <button
                        onClick={() => {
                            dispatch(setToggle());
                        }}
                    >
                        {" "}
                        <CloseIcon className=" absolute top-4 right-4" />
                    </button>
                    <ul className=" flex flex-col gap-4 justify-center items-center">
                        {[
                            { name: "All", icon: <AllInclusiveIcon /> },
                            { name: "Coding", icon: <CodeIcon /> },
                            { name: "React", icon: <JavascriptIcon /> },
                            { name: "Javascript", icon: <CodeIcon /> },
                            { name: "NextJS", icon: <JavascriptIcon /> },
                            { name: "Music", icon: <MusicNoteIcon /> },
                            { name: "Live", icon: <LiveTvIcon /> },
                            { name: "Gaming", icon: <SportsEsportsIcon /> },
                            { name: "Health", icon: <FavoriteBorderIcon /> },
                            { name: "Education", icon: <SchoolIcon /> },
                            { name: "Fitness", icon: <FavoriteBorderIcon /> },
                            { name: "Sports", icon: <SportsBasketballIcon /> },
                        ].map((item, index) => {
                            return (
                                <div key={index}>
                                    <a
                                        href="#"
                                        className=" flex gap-2 hover:bg-[#4c4c4c] w-full justify-center p-4"
                                        onClick={() => {
                                            dispatch(setCategory(item.name));
                                            router.push('/')
                                        }}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </a>
                                </div>
                            );
                        })}
                    </ul>
                    <h5 className=" text-xs absolute bottom-2 left-1/2 -translate-x-1/2">
                        Copyright 2022 YouTube
                    </h5>
                </div>
            )}
        </div>
    );
};

export default SideBar;
