import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/Register.module.css";
import authAction from "src/redux/action/Auth";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [unouthorized, setUnouthorized] = useState(false);
  const [body, setBody] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const registerHandler = (e) => {
    e.preventDefault();
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const checkEmptyForm = (body) => {
    if (!body.email || !body.password || !body.firstName || !body.lastName)
      return setEmptyForm(true);
    body.email &&
      body.password &&
      body.firstName &&
      body.lastName &&
      setEmptyForm(false);
  };

  const changehandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const sendHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.registerThunk(body));
  };

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
    if (!auth.isLoading) setEmptyForm(false);
    if (auth.registerFulfilled) router.push("/login");
  }, [auth, router]);

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  return (
    <>
      <PageTitle title="Register" />
      <Layout>
        <h1 className={styles["h1"]}>
          Start Accessing Banking Needs With All Devices and All Platforms With
          30.000+ Users
        </h1>
        <p className={styles["description"]}>
          Transfering money is easier than ever, you can access Zwallet wherever
          you are. Desktop, laptop, mobile phone? we cover all of that for you!
        </p>
        <form className={styles["form"]} onSubmit={registerHandler}>
          <div
            className={body.firstName ? styles["fname"] : styles["non-active"]}
          >
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              required
              onChange={changehandler}
            ></input>
          </div>
          <div
            className={body.lastName ? styles["lname"] : styles["non-active"]}
          >
            <i className="fa-solid fa-user"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              required
              onChange={changehandler}
            ></input>
          </div>
          <div className={body.email ? styles["email"] : styles["non-active"]}>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={changehandler}
            ></input>
          </div>
          <div
            className={
              body.password ? styles["password"] : styles["non-active"]
            }
          >
            <i className="fa-solid fa-lock"></i>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
              onChange={changehandler}
            ></input>
            <i
              className={`bi ${showPassword ? `bi-eye-slash` : `bi-eye`} 
            ${styles["toggle-password"]}`}
              onClick={togglePassword}
            ></i>
          </div>
          {auth.isError && (
            <p
              style={{
                textAlign: "center",
                color: "var(--red)",
                fontWeight: "700",
              }}
            >
              {auth.error}
            </p>
          )}
          <button type="submit" disabled={emptyForm} onClick={sendHandler}>
            Register
          </button>
          <div className={styles["link-blue"]}>
            Already have an account? Let’s{"  "}
            <Link href="/login">Login</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
