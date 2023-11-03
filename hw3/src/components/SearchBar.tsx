"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import Image from "next/image";
import search from "@/assets/search.png";

type SearchBarProps = {
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar(/*{setSearch}: SearchBarProps*/) {

    const [searchInput, setSearchInput] = useState("");

    return (
        <>
        <div className="flex">
            <input
                className="border border-solid border-1 rounded-md p-2 w-1000px"
                placeholder="尋找活動"
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => null/*setSearch(searchInput)*/}>
                <Image src={search} alt="search" width={35} height={35}/>
            </button>
        </div>
        </>
    )
}