import Home from "./pages/Home";
import "./App.css";
import { useState } from "react";
import LoginWithGoogle from "./pages/LoginWithGoogle";
import { account } from "./config/config.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const promise = account.getSession('current');
  promise.then(
    function (response) {
      console.log("get account",response);
      setIsLoggedIn(true); // Success
    },
    function (error) {
      setIsLoggedIn(false);
      console.log(error); // Failure
    }
  );

  return (
    <div className="App w-screen h-screen overflow-hidden">
      {isLoggedIn ? (
        <Home islogin={isLoggedIn} setlogin={setIsLoggedIn} />
      ) : (
        <LoginWithGoogle />
      )}
    </div>
  );
}

export default App;
