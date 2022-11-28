import React, { useEffect, useState } from "react";
import { setCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Layout from "src/Components/LayoutAuth";
import PageTitle from "src/Components/Header";
import styles from "styles/Login.module.css";
import authAction from "src/redux/action/Auth";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login({ data }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [Error, setError] = useState(false);
  const [notactive, setnotactive] = useState(false);
  const [body, setBody] = useState({});
  const auth = useSelector((state) => state.auth);

  if (data === "ISLOGIN") router.push("/dashboard");

  const checkEmptyForm = (body) => {
    if (!body.email || !body.password) return setEmptyForm(true);
    body.email && body.password && setEmptyForm(false);
  };
  const togglePassword = () => setShowPassword(!showPassword);

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const loginHandler = (e) => {
    e.preventDefault();
    setError(false);
    setnotactive(false);
    dispatch(authAction.loginThunk(body, goRoute));
  };

  const goRoute = () => {
    // setCookie("token", auth.userData.token);
    // setCookie("id", auth.userData.id);
    const token = getCookie("token");
    if (!auth.userData.pin) router.push("/createpin");
    if (token) router.push("/dashboard");
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
    if (auth.isError && auth.error === "Account not active") setnotactive(true);
    if (
      (auth.isError && auth.error === "Email / Account not registed") ||
      (auth.isError && auth.error === "Wrong password")
    )
      setError(true);
  }, [auth, router]);

  return (
    <>
      <PageTitle title="Login" />

      <Layout>
        <h1 className={styles["h1"]}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className={styles["description"]}>
          Transfering money is eassier than ever, you can access Zwallet
          wherever you are. Desktop, laptop, mobile phone? we cover all of that
          for you!
        </p>
        <form
          className={`${styles["form"]} ${Error ? styles["error"] : undefined}`}
        >
          <div className={styles["email"]}>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={changeHandler}
            ></input>
          </div>
          <div className={styles["password"]}>
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              onChange={changeHandler}
            ></input>
            <i
              className={`bi ${showPassword ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword}
            ></i>
          </div>
          <div className={styles["link-forgot"]}>
            <Link href="/reset-password" passHref className={styles.fgrt}>
              Forgot password?
            </Link>
            {notactive && (
              <p className={styles.error}>
                Please Check Your Email And Verification Email First!
              </p>
            )}
            {Error && <p className={styles.error}>Email or Password Invalid</p>}
            <button type="submit" disabled={emptyForm} onClick={loginHandler}>
              Login
            </button>
          </div>
          <div className={styles["link-blue"]}>
            Don’t have an account? Let’s{"  "}
            <Link href="/register">Register</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });
  const id = getCookie("id", { req, res });
  try {
    if (token) throw "ISLOGIN";
    const data = null;
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: err,
      },
    };
  }
};
