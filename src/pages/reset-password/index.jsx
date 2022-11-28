import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "src/Components/LayoutAuth";
import PageTitle from "src/Components/Header";
import styles from "styles/Forgot.module.css";
import authAction from "src/redux/action/Auth";

export default function Forgot() {
  const [body, setBody] = useState({});
  const [emptyForm, setEmptyForm] = useState(true);
  const [inputEmail, setInput] = useState(true);
  const [done, setDone] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const checkEmptyForm = (body) => {
    if (!body.email) return setEmptyForm(true);
    body.email && setEmptyForm(false);
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  const clickHandler = (e) => {
    e.preventDefault();
    const baseUrll = `${process.env.NEXT_PUBLIC_URL_PAGE}/reset-password`;
    const bodys = {
      email: body.email,
      linkDirect: baseUrll,
    };
    dispatch(authAction.forgotThunk(bodys));
  };

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
    if (!auth.isLoading) setEmptyForm(false);
    if (auth.forgotFullfilled) {
      setInput(false);
      setDone(true);
    }
  }, [auth]);

  return (
    <>
      <PageTitle title="Forgot Password" />

      <Layout>
        {inputEmail && (
          <>
            <h1 className={styles["h1"]}>
              Did You Forgot Your Password? Don’t Worry, You Can Reset Your
              Password In a Minutes.
            </h1>
            <p className={styles["description"]}>
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </p>
            <form className={styles["form"]}>
              <div
                className={`${styles["email"]} ${
                  body.email ? styles.on : undefined
                }`}
              >
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your e-mail"
                  required
                  onChange={changeHandler}
                ></input>
              </div>
              <button type="submit" disabled={emptyForm} onClick={clickHandler}>
                Confirm
              </button>

              <div className={styles["link-blue"]}>
                Back to{"  "}
                <Link href="/login">Login</Link>
              </div>
            </form>
          </>
        )}
        {done && (
          <>
            <div className={styles["check-list"]}>
              <i className="fa-solid fa-check"></i>
            </div>
            <p className={styles.created}>
              Process Success, Please Check Your Email !
            </p>
            <p className={styles.access}>
              {`Link form to change your password has been send to your email,
              please check your email, if no e-mail arrives don't forget check
              your spam email.`}
            </p>
            <div className={styles["link-blue"]}>
              Back to{"  "}
              <Link href="/login">Login</Link>
            </div>
          </>
        )}
      </Layout>
    </>
  );
}
