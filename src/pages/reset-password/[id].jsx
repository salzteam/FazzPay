import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/ResetPassword.module.css";
import authAction from "src/redux/action/Auth";

export default function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notSimiliar, setNotSimilar] = useState(false);
  const [emptyForm, setEmptyForm] = useState(true);
  const [body, setBody] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  const toogleNewPassowrd = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const checkEmptyForm = (body) => {
    if (!body.newPassword || !body.confirmPassword) return setEmptyForm(true);
    body.newPassword && body.confirmPassword && setEmptyForm(false);
  };

  const subimitHandler = (e) => {
    e.preventDefault();
    setNotSimilar(false);
    if (body.newPassword !== body.confirmPassword) return setNotSimilar(true);
    const data = {
      keysChangePassword: router.query.id,
      newPassword: body.newPassword,
      confirmPassword: body.confirmPassword,
    };
    dispatch(authAction.resetThunk(data));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
    if (!auth.isLoading) setEmptyForm(false);
    if (auth.resetFullfilled) router.push("/login");
  }, [auth]);

  return (
    <>
      <PageTitle title="Reset Password" />

      <Layout>
        <h1 className={styles["h1"]}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h1>
        <p className={styles["description"]}>
          Now you can create a new password for your FazzPay account. Type your
          password twice so we can confirm your new passsword.
        </p>
        <form className={styles["form"]}>
          <div
            className={`${styles["password"]} ${
              body.newPassword ? styles.on : undefined
            }`}
          >
            <i className="fa-solid fa-lock"></i>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Enter your new password"
              required
              onChange={changeHandler}
              onClick={() => setNotSimilar(false)}
            ></input>
            <i
              className={`bi ${showNewPassword ? `bi-eye-slash` : `bi-eye`} 
        ${styles["toggle-password"]}`}
              onClick={toogleNewPassowrd}
            ></i>
          </div>
          <div
            className={`${styles["confirmPassword"]} ${
              body.confirmPassword ? styles.on : undefined
            }`}
          >
            <i className="fa-solid fa-lock"></i>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter your password"
              required
              onChange={changeHandler}
            ></input>
            <i
              className={`bi ${showConfirmPassword ? `bi-eye-slash` : `bi-eye`} 
        ${styles["toggle-password"]}`}
              onClick={toggleConfirmPassword}
            ></i>
          </div>
          <p
            className={`${styles["password-notif"]} ${
              notSimiliar ? styles["show"] : styles["hide"]
            }`}
          >
            Retyped password didn&apos;t match!
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={emptyForm}
            onClick={subimitHandler}
          >
            Submit
          </button>
          <div className={styles["link-blue"]}>
            Back to{"  "}
            <Link href="/login">Login</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
