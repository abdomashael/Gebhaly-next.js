import {  useContext, useState } from "react";
import {
  Button,
  Form,
  Header,
  Label,
  Loader as SLoader,
} from "semantic-ui-react";
import { LoginContext } from "../../pages/_app";
import { login } from "../../utils/api";


const onSubmitHandler = async (e, setTryLogin, setError, isLogin,loginContext) => {
    e.preventDefault();
    const mail = e.target.mail.value
    setTryLogin(true);
    let resCode = await login(e.target.mail.value, e.target.pass.value);
    setTryLogin(false);
  
    switch (resCode) {
      case 401:
        setError({
          hidden: false,
          content: "Email or password isn't true, try again. ",
        });
        break;
      case 200:
        loginContext.setUserMail(mail)
        isLogin(true);
        break;
  
      default:
        console.log(resCode);
        break;
    }
  };
  
const Login = ({ isLogin }) => {
  const [tryLogin, setTryLogin] = useState(false);
  const [error, setError] = useState({ hidden: true, content: "" });

  const login= useContext(LoginContext);
  return (
    <div>
      <Form
        onSubmit={(e) => {
          onSubmitHandler(e, setTryLogin, setError, isLogin,login);
        }}
      >
        <Header  color="blue" size="large" >
          Login
        </Header>
        <br/>
        <Form.Field>
          <label>Email address</label>
          <input type="email" name="mail" placeholder="Email address" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="pass" placeholder="Password" />
        </Form.Field>
        <Button disabled={tryLogin} type="submit">
          Login
        </Button>
      </Form>

      <br />
      <span hidden={!tryLogin}>
        <SLoader />
      </span>
      <span hidden={error.hidden}>
        <Label basic color="red" pointing="up">
          {error.content}
        </Label>
      </span>
    </div>
  );
};

export default Login;
