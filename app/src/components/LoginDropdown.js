import { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { usePost } from "../hooks/usePost";
import { toast } from "react-toastify";
import { validateField } from "../utils/Utils";
import "./LoginDropdown.scss";

const LoginDropdown = ({ parentCallback, routes }) => {
  const ref = useRef(null);

  const [inputs, setInputs] = useState({});
  const [title, setTitle] = useState("Login");
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  /* eslint-disable */
  const [cookies, setCookie] = useCookies(["JWT_TOKEN"]);
  let { postData, data, isLoading, error } = usePost();
  /* eslint-disable */

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else {
      if (data && isLogin) {
        let token = data.data.token;

        if (!token) {
          toast.error("Usuário e/ou senha incorretos");
        } else {
          setCookie("JWT_TOKEN", token, {
            maxAge: 10800,
          });

          location.reload();
        }
      } else if (data && isRegister) {
        let recoveryCode = data.data.recoveryCode;

        if (!recoveryCode) {
          toast.error(data.data.message);
        } else {
          setIsRegister(false);
          setIsRegistered(true);

          setTitle("Cadastro realizado!");
        }
      } else if (data && isForgotPassword) {
        toast.success(data.data.message);
        handleIsLogin();
      }

      data = null;
    }
  }, [data, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (validateField(inputs.username) && validateField(inputs.password)) {
        await postData({
          method: "post",
          url: "/user/login",
          data: {
            username: inputs.username,
            password: inputs.password,
          },
        });
      } else {
        toast.error("Usuário e senha obrigatórios");
      }
    }

    if (isRegister) {
      if (
        validateField(inputs.username) &&
        validateField(inputs.password) &&
        validateField(inputs.confirmPassword)
      ) {
        if (validateField(inputs.password, inputs.confirmPassword)) {
          await postData({
            method: "post",
            url: "/user/register",
            data: {
              username: inputs.username,
              password: inputs.password,
            },
          });
        } else {
          toast.error("Confirmação de senha incorreta");
        }
      } else {
        toast.error("Usuário, senha e confirmação obrigatórios");
      }
    }

    if (isForgotPassword) {
      if (
        validateField(inputs.username) &&
        validateField(inputs.recoveryCode) &&
        validateField(inputs.password) &&
        validateField(inputs.confirmPassword)
      ) {
        if (validateField(inputs.password, inputs.confirmPassword)) {
          await postData({
            method: "post",
            url: "/user/recover",
            data: {
              username: inputs.username,
              password: inputs.password,
              recoveryCode: inputs.recoveryCode,
            },
          });
        } else {
          toast.error("Confirmação de senha incorreta");
        }
      } else {
        toast.error("Usuário, código, senha e confirmação obrigatórios");
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const LoginForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário</label>
        <input
          autoFocus
          type="text"
          name="username"
          id="username"
          required
          autoComplete="username"
          onChange={handleChange}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          autoComplete="current-password"
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>
      </form>
    );
  };

  const RegisterForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuário</label>
        <input
          autoFocus
          type="text"
          name="username"
          id="username"
          required
          autoComplete="off"
          onChange={handleChange}
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          autoComplete="off"
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          autoComplete="off"
          onChange={handleChange}
        />

        <button type="submit">Cadastrar</button>
      </form>
    );
  };

  const RegisteredInfo = () => {
    return (
      <div className="registered">
        <span>Armazene o código de recuperação em um local seguro:</span>

        <h3>{data && data.data.recoveryCode && data.data.recoveryCode}</h3>

        <button type="button" onClick={handleIsLogin}>
          Entrar
        </button>
      </div>
    );
  };

  const ForgotPasswordForm = () => {
    return (
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="username">Usuário</label>
        <input
          autoFocus
          type="text"
          name="username"
          id="username"
          required
          onChange={handleChange}
        />

        <label htmlFor="recoveryCode">Código de recuperação</label>
        <input
          type="text"
          name="recoveryCode"
          id="recoveryCode"
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Nova senha</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          autoComplete="off"
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">Confirmar nova senha</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          required
          autoComplete="off"
          onChange={handleChange}
        />

        <button type="submit">Enviar</button>
      </form>
    );
  };

  let form = LoginForm();

  function profileMenuHandleBlur(e) {
    parentCallback(e);
  }

  const handleIsLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
    setIsRegistered(false);
    setIsForgotPassword(false);

    setTitle("Login");
    form = LoginForm();
  };

  const handleIsRegister = () => {
    setIsRegister(true);
    setIsLogin(false);
    setIsRegistered(false);
    setIsForgotPassword(false);

    setTitle("Cadastre-se");
    form = RegisterForm();
  };

  const handleIsForgotPassword = () => {
    setIsForgotPassword(true);
    setIsLogin(false);
    setIsRegister(false);
    setIsRegistered(false);

    setTitle("Esqueci minha senha");
    form = ForgotPasswordForm();
  };

  return (
    <div ref={ref} tabIndex="0" className="login-dropdown" onBlur={profileMenuHandleBlur}>
      <h2>{title}</h2>

      {isLogin && LoginForm()}
      {isRegister && RegisterForm()}
      {isRegistered && RegisteredInfo()}
      {isForgotPassword && ForgotPasswordForm()}

      {!isRegistered && (
        <div className="login-links">
          {!isLogin && (
            <button type="button" onClick={handleIsLogin}>
              Login
            </button>
          )}
          {!isRegister && (
            <button type="button" onClick={handleIsRegister}>
              Cadastre-se
            </button>
          )}
          {!isForgotPassword && (
            <button type="button" onClick={handleIsForgotPassword}>
              Esqueci minha senha
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
