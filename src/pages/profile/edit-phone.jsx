import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Header from "src/Components/Navbar";
import Footer from "src/Components/Footer";
import Sidebar from "src/Components/Sidebar";
import Loader from "src/Components/Loader";
import css from "styles/EditPhone.module.css";
import authAction from "src/redux/action/User";
import axios from "axios";
import Head from "src/Components/Header";

function EditPhone({ data }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isError, setisError] = useState();

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);
  const router = useRouter();

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  const valueHandler = (e) => {
    e.target.value.length === 0 && setPhoneNumber("");
    if (e.target.value.charAt(0) === "0") {
      e.target.value = "8";
      setPhoneNumber(e.target.value);
    }
    e.target.value.length[0] === "0" && setPhoneNumber("8");
    if (/[0-9]{1,12}/g.test(e.target.value[e.target.value.length - 1]))
      setPhoneNumber(e.target.value);
  };

  const phoneChangeHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setisError();
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${auth.userData.id}`;
    axios
      .patch(
        baseUrl,
        { noTelp: `0${phoneNumber}` },
        { headers: { Authorization: `Bearer ${auth.userData.token}` } }
      )
      .then((result) => {
        const profileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${auth.userData.id}`;
        axios
          .get(profileUrl, {
            headers: {
              Authorization: `Bearer ${auth.userData.token}`,
            },
          })
          .then((data) => {
            setLoading(false);
            dispatch(authAction.profileidThunk(data.data));
            router.push("/profile/information");
          })
          .catch((err) => {
            setLoading(false);
            setisError("System Error !");
          });
      })
      .catch((errs) => {
        setLoading(false);
        setisError("System Error !");
      });
  };

  return (
    <>
      <Head title={"Edit PhoneNumber"}>
        <Header />
        <main className={css["container"]}>
          <div className="container">
            <div className={`row ${css["main-content"]}`}>
              <div className="col-lg-3 col-md-4">
                <Sidebar />
              </div>
              {isLoading && (
                <div style={{ position: "fixed", top: "50%", left: "50%" }}>
                  <Loader />
                </div>
              )}
              <div className="col-lg-9 col-md-8 col-12">
                <div className={css["edit-content"]}>
                  <div className={css["edit-title"]}>
                    <div className={css["title"]}>
                      <h1>Edit Phone Number</h1>
                    </div>
                    <div className={css["definition"]}>
                      <p>
                        Add at least one phone number for the transfer ID so you
                        can start transfering your money to another user.
                      </p>
                    </div>
                  </div>
                  <form action="">
                    <div
                      className={`${css["input"]} ${
                        phoneNumber.length !== 0 ? css["accept"] : undefined
                      }`}
                    >
                      <i className="fa-solid fa-phone"></i>
                      <p>+62</p>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={valueHandler}
                        maxlength="11"
                      />
                    </div>
                    {isError && (
                      <p
                        style={{
                          color: "var(--red)",
                          fontWeight: "700",
                          textAlign: "center",
                          paddingTop: "1rem",
                        }}
                      >
                        {isError}
                      </p>
                    )}
                    <div
                      className={`${css["edit-btn"]} ${
                        phoneNumber.length !== 0 ? css["accept2"] : undefined
                      }`}
                    >
                      <button onClick={phoneChangeHandler}>
                        Edit Phone Number
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
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

export default EditPhone;
