import React, { use, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import css from "styles/Changepwd.module.css";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import Header from "components/Navbar";
import Loader from "components/Loader";
import axios from "axios";
import Head from "components/Header";

function Changepassword({ data }) {
  // const router = useRouter();
  const [body, setBody] = useState();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [allowedbtn, setallowedbtn] = useState(true);
  const [similarity1, setSimilarity1] = useState(false);
  const [similarity2, setSimilarity2] = useState(false);
  const [passwordWrong, setpasswordWrong] = useState(false);
  const [success, setsuccess] = useState(false);
  const [filled, setFilled] = useState(false);
  const [filledNew, setFilledNew] = useState(false);
  const [filledConf, setFilledConf] = useState(false);
  const [isLoading, setLoading] = useState(false);
  // const [value, setValue] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  const sendHandler = (e) => {
    e.preventDefault();
    if (allowedbtn) return;
    setLoading(false);
    setSimilarity1(false);
    setSimilarity2(false);
    setpasswordWrong(false);
    setsuccess(false);
    if (body && body.newPassword !== body.confirmPassword)
      return setSimilarity2(true);
    if (
      (body && body.oldPassword === body.confirmPassword) ||
      body.oldPassword === body.newPassword
    )
      return setSimilarity1(true);
    setLoading(true);
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/password/${auth.userData.id}`;
    axios
      .patch(baseUrl, body, {
        headers: { Authorization: `Bearer ${auth.userData.token}` },
      })
      .then((result) => {
        setLoading(false);
        setsuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setpasswordWrong(true);
      });
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (body && body.oldPassword) setFilled(true);
    if (body && body.newPassword) setFilledNew(true);
    if (body && body.confirmPassword) setFilledConf(true);
    if (body && !body.oldPassword) setFilled(false);
    if (body && !body.newPassword) setFilledNew(false);
    if (body && !body.confirmPassword) setFilledConf(false);
    if (body && body.oldPassword && body.newPassword && body.confirmPassword)
      setallowedbtn(false);
    if (
      !body ||
      !body.oldPassword ||
      !body.newPassword ||
      !body.confirmPassword
    )
      setallowedbtn(true);
  }, [body]);

  return (
    <>
      <Head title={"Change Password"}>
        <Header />
        <div className={css["main-container"]}>
          <div className="col-lg-3 col-md-4">
            <Sidebar />
          </div>
          {isLoading && (
            <div style={{ position: "fixed", top: "40%", left: "50%" }}>
              <Loader />
            </div>
          )}
          <div className="col-lg-9 col-md-8 col-12">
            <div className={css["box-main"]}>
              <div className={css["header"]}>
                <h2 className={css["title"]}>Change Password</h2>
              </div>
              <div className={css["title-small"]}>
                <p>
                  You must enter your current password and then type your new
                  password twice.
                </p>
              </div>
              <form
                className={`${css["form-password"]} ${
                  allowedbtn ? css["not-allowed"] : undefined
                }`}
              >
                <div className={css["password"]}>
                  <i
                    className={`fa-solid fa-lock ${
                      filled ? css["filled"] : undefined
                    }`}
                  ></i>
                  <input
                    type={passwordShown ? "text" : "password"}
                    name="oldPassword"
                    placeholder="Enter your old password"
                    required
                    onChange={changeHandler}
                  ></input>
                  <i
                    className={`bi ${passwordShown ? `bi-eye-slash` : `bi-eye`} 
            ${css["toggle-password"]}`}
                    onClick={togglePassword}
                  ></i>
                </div>
                <div className={css["password"]}>
                  <i
                    className={`fa-solid fa-lock ${
                      filledNew ? css["filled"] : undefined
                    }`}
                  ></i>
                  <input
                    type={passwordShown1 ? "text" : "password"}
                    name="newPassword"
                    placeholder="Enter your new password"
                    required
                    onChange={changeHandler}
                  ></input>
                  <i
                    className={`bi ${
                      passwordShown1 ? `bi-eye-slash` : `bi-eye`
                    } 
            ${css["toggle-password"]}`}
                    onClick={togglePassword1}
                  ></i>
                </div>
                <div className={css["password"]}>
                  <i
                    className={`fa-solid fa-lock ${
                      filledConf ? css["filled"] : undefined
                    }`}
                  ></i>
                  <input
                    type={passwordShown2 ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    required
                    onChange={changeHandler}
                  ></input>
                  <i
                    className={`bi ${
                      passwordShown2 ? `bi-eye-slash` : `bi-eye`
                    } 
            ${css["toggle-password"]}`}
                    onClick={togglePassword2}
                  ></i>
                </div>
                <p
                  className={`${css["password-notif"]} ${
                    !similarity1 ? css["show"] : css["hide"]
                  }`}
                >
                  Your new password cannot be the same as your old password!
                </p>
                <p
                  className={`${css["password-notif"]} ${
                    similarity2 ? css["hide"] : css["show"]
                  }`}
                >
                  Retyped password didn&apos;t match!
                </p>
                <p
                  className={`${css["password-notif"]} ${
                    passwordWrong ? css["hide"] : css["show"]
                  }`}
                >
                  Password Wrong !
                </p>
                <p
                  className={`${css["password-notif-success"]} ${
                    success ? css["hide"] : css["show"]
                  }`}
                >
                  Success Change Password !
                </p>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={sendHandler}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </Head>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });
  try {
    if (!token) throw "NOT ACCESS TOKEN";
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

export default Changepassword;
