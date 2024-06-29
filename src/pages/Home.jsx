import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ChatSection from "../components/ChatSection";
import { Routes, Route } from "react-router-dom";

export default function Home({ islogin, setlogin }) {

 
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="basis-[30%] h-screen bg-[#3f0f40] ">
          <Sidebar islogin={islogin} setlogin={setlogin} />
        </div>
        <div className="basis-[70%]">
          <Routes>
            <Route path="/chatSection" element={<ChatSection />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
