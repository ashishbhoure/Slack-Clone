import React from "react";
import avatar from "../assets/avatar.png";
import { MdAccessTime } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { MdHelpOutline } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex w-full items-center p-0 bg-[#3f0f40]">
      {/* header left section */}
      <div className="flex basis-[30%] items-center  ml-[20px]">
        <img
          className="w-10 h-10 rounded-full hover:cursor-pointer hover:opacity-80"
          src={avatar}
          alt="Rounded avatar"
        />
        <MdAccessTime
          className="mr-[30px] hover:cursor-pointer ml-auto"
          style={{ color: "white" }}
        />
      </div>

      {/* hearch search section */}
      <div className="flex mx-auto items-center text-center rounded-lg pl-12 border-2 border-slate-700 bg-[#421f44] min-w-[30vw] outline-none">
        <CiSearch style={{ color: "white" }} className="mr-[10px]" />
        <input
          type="text"
          name="search"
          placeholder="Search vinayBhoure"
          className="bg-[transparent] text-white "
        />
      </div>

      {/* right section of headder */}
      <div className="flex basis-1/5">
        <MdHelpOutline
          className="ml-auto mr-[20px]"
          style={{ color: "white" }}
        />
      </div>
    </div>
  );
}
