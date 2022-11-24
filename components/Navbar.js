import React from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { setCategory, setSearch, setToggle } from "../redux/slice";
import fetchData from "../utils/fetch";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

export default function SearchAppBar() {
    const dispatch = useDispatch();
    const router = useRouter();

    return (
        <Box sx={{ flexGrow: 1 }} className=" fixed top-0 w-full">
            <AppBar position="static" style={{ backgroundColor: "#212121" }}>
                <Toolbar className="flex justify-between">
                    <div className=" flex items-center gap-6">
                        {/* //? STATE BASED ON PREV STATE */}
                        <Button
                            className=" text-white hover:bg-transparent"
                            onClick={() => {
                                dispatch(setToggle());
                            }}
                        >
                            <MenuIcon className=" cursor-pointer" />
                        </Button>
                        <Link href="/" className="flex items-center gap-1">
                            <div className="flex items-center">
                                <YouTubeIcon className=" text-red-600 text-5xl cursor-pointer" />
                                <h2 className=" opacity-0 md:opacity-100 text-white">
                                    YOUTUBE
                                </h2>
                            </div>
                        </Link>
                    </div>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                            onChange={(e) => {
                                dispatch(setCategory(e.target.value));
                                router.push("/");
                            }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
