import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { useEffect, useState } from "react";
import { GetUser } from "../utils/api";

export const LoginContext = React.createContext({});

function MyApp({ Component, pageProps }) {
  const [userMail, setUserMail] = useState("");

  const checkUser = async () => {
    try {
      const res = await GetUser();
      setUserMail(res.data.message.email);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    checkUser()
  }, []);

  return (
    <LoginContext.Provider value={{ email: userMail, setUserMail: setUserMail }}>
      <Component {...pageProps} />
    </LoginContext.Provider>
  );
}

export default MyApp;
