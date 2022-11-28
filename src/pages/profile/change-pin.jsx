import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
const ReactCodeInput = dynamic(import("react-code-input"));
import Head from "components/Header";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Loader from "components/Loader";

import styles from "styles/changepin.module.css";
import axios from "axios";

function CreatePin({ data }) {
  const [isLoading, setLoading] = useState(false);
  const [confirmPin, setConfirm] = useState(true);
  const [changepin, setChange] = useState(false);
  const [oldPin, setOldPin] = useState("");
  const [newPin, setnewPin] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [errorMsg, seterrorMsg] = useState();
  const [successMsg, setsuccessMsg] = useState();

  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  useEffect(() => {
    if (oldPin) setAllowed(true);
    if (newPin) setAllowed(true);
  }, [oldPin, newPin]);

  const checkOldPinHandler = (e) => {
    e.preventDefault();
    if (!allowed) return;
    setLoading(true);
    seterrorMsg();
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pin/${oldPin}`;
    axios
      .get(baseUrl, {
        headers: { Authorization: `Bearer ${auth.userData.token}` },
      })
      .then((results) => {
        setLoading(false);
        setConfirm(false);
        setChange(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        seterrorMsg("Pin Not Correct !");
      });
  };

  const changeNewPinHandler = (e) => {
    e.preventDefault();
    if (!allowed) return;
    setLoading(true);
    seterrorMsg();
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/pin/${auth.userData.id}`;
    axios
      .patch(
        baseUrl,
        { pin: newPin },
        { headers: { Authorization: `Bearer ${auth.userData.token}` } }
      )
      .then((results) => {
        setLoading(false);
        setsuccessMsg("Pin hasbeen change to new !");
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        seterrorMsg("System Error !");
      });
  };

  const oldPinHandler = (e) => setOldPin(e);
  const newPinHandler = (e) => setnewPin(e);

  return (
    <>
      <Head title={"Change Pin"}>
        <Header />
        <div className={styles["main-container"]}>
          <div className="col-lg-3 col-md-4">
            <Sidebar />
          </div>
          {isLoading && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "19rem",
                  left: "47rem",
                  zIndex: "11",
                }}
              >
                <Loader />
              </div>
            </>
          )}
          <div className="col-lg-9 col-md-8 col-12">
            {confirmPin && (
              <div className={styles["pin-container"]}>
                <div className={styles.title}>
                  <h2 className={styles["h2"]}>Confirm Your Old Pin</h2>
                  <p className={styles["description"]} style={{ width: "40%" }}>
                    Enter your current 6 digits Fazzpay PIN below to continue to
                    the next steps.
                  </p>
                </div>
                <div className={styles["form-container"]}>
                  <form
                    className={`${styles["form"]} ${
                      oldPin && oldPin.length !== 0
                        ? undefined
                        : styles["not-allowed"]
                    }`}
                  >
                    <div className={`${styles["code-wrapper"]}`}>
                      <ReactCodeInput
                        type="number"
                        fields={6}
                        className={styles["input"]}
                        onChange={(e) => {
                          oldPinHandler(e);
                        }}
                      />
                    </div>
                    {errorMsg && (
                      <p
                        style={{
                          color: "var(--red)",
                          textAlign: "center",
                          fontWeight: "700",
                          position: "absolute",
                          bottom: "11.9rem",
                          right: "33%",
                        }}
                      >
                        {errorMsg}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={checkOldPinHandler}
                    >
                      Confirm
                    </button>
                  </form>
                </div>
              </div>
            )}
            {changepin && (
              <>
                <div className={styles["pin-container"]}>
                  <div className={styles.title}>
                    <h2 className={styles["h2"]}>Input Your New PIN</h2>
                    <p
                      className={styles["description"]}
                      style={{ width: "45%" }}
                    >
                      Enter your current 6 digits Fazzpay PIN below to continue
                      to the next steps.
                    </p>
                  </div>
                  <div className={styles["form-container"]}>
                    <form
                      className={`${styles["form"]} ${
                        newPin && newPin.length !== 0
                          ? undefined
                          : styles["not-allowed"]
                      }`}
                    >
                      <div className={`${styles["code-wrapper"]}`}>
                        <ReactCodeInput
                          type="number"
                          fields={6}
                          className={styles["input"]}
                          onChange={(e) => {
                            newPinHandler(e);
                          }}
                        />
                      </div>
                      {errorMsg && (
                        <p
                          style={{
                            color: "var(--red)",
                            textAlign: "center",
                            fontWeight: "700",
                            position: "absolute",
                            bottom: "11.9rem",
                            right: "33%",
                          }}
                        >
                          {errorMsg}
                        </p>
                      )}
                      {successMsg && (
                        <p
                          style={{
                            color: "var(--green)",
                            textAlign: "center",
                            fontWeight: "700",
                            position: "absolute",
                            bottom: "11.9rem",
                            right: "30%",
                          }}
                        >
                          {successMsg}
                        </p>
                      )}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={changeNewPinHandler}
                      >
                        Confirm
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
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

export default CreatePin;
