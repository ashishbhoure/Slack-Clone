import React from "react";
import slackIcon from "../assets/slackIcon.png";
import {account} from "../config/config.js"
function LoginWithGoogle() {

       function loginHandler(e) {
        e.preventDefault();

        account.createOAuth2Session('google', 'https://slack-clone-by-vinaybhoure.vercel.app', 'https://slack-clone-by-vinaybhoure.vercel.app')
       }

  return (
    <div className="flex justify-center items-center h-[100%] bg-gray-200">
      <div className="basis-[50%] max-w-md p-8  rounded-lg bg-slate-300 border-2">
        <h1 className="font-bold text-center">Log In</h1>
        <div className="flex flex-col  items-center my-1">
          <img
            className="w-10 h-10 rounded-full hover:cursor-pointer hover:opacity-80 "
            src={slackIcon}
            alt="Rounded avatar"
          />
         
        </div>
        <form
          onSubmit={loginHandler}
          className="flex flex-col justify-center gap-3 text-salte-400 "
        >
          <button className="p-2 bg-blue-500 hover:bg-blue-700 hover:border-slate-600 border-2 rounded-lg outline-none">
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginWithGoogle;
