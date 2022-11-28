import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookie } from "cookies-next";
import React, { useState, useEffect, use } from "react";
import Styles from "styles/Sidebar.module.css";
import authAction from "src/redux/action/Auth";
import axios from "axios";

function Sidebar() {
  const [selectDashboard, setDashboard] = useState(false);
  const [selectTransfer, setTransfer] = useState(false);
  const [selectTopUp, setTopUp] = useState(false);
  const [selectProfile, setProfile] = useState(false);
  const [amount, setAmount] = useState();

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const submitHandler = (e) => {
    setErrMsg();
    setisLoading(true);
    if (!amount || amount.length === 0)
      return setErrMsg("Input Amount First !");
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/top-up`;
    const config = {
      headers: {
        Authorization: `Bearer ${auth.userData.token}`,
      },
    };
    axios
      .post(baseUrl, { amount: amount }, config)
      .then((results) => {
        setisLoading(false);
        setShowTopUp(false);
        setTopUp(false);
        openInNewTab(results.data.data.redirectUrl);
      })
      .catch((err) => {
        setisLoading(false);
        setErrMsg("System Error");
      });
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const amountHandler = (e) => {
    const letters = /^[A-Za-z]+$/;
    if (e.target.value.match(letters)) {
      return (e.target.value = "");
    }
    let v = e.target.value.replace(/[^\dA-Z]/g, "");
    e.target.value = v
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      .replace(/[^0-9]+$/, "");
    if (e.target.value.includes(".")) {
      const data = e.target.value.split(".").join("");
      return setAmount(data);
    }
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (!showTopUp) {
      if (
        router.pathname.includes("transfer") ||
        router.pathname.includes("ammount") ||
        router.pathname.includes("confirmation")
      )
        return setTransfer(true);
      if (router.pathname.includes("dashboard")) return setDashboard(true);
      if (router.pathname.includes("profile")) return setProfile(true);
    }
  }, [showTopUp, router]);

  const dashboardHandler = (e) => {
    e.preventDefault();
    setDashboard(true);
    setTransfer(false);
    setTopUp(false);
    setProfile(false);
    router.push("/dashboard");
  };
  const transferHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(true);
    setTopUp(false);
    setProfile(false);
    router.push("/transfer");
  };
  const topupHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(false);
    setTopUp(true);
    setProfile(false);
    setShowTopUp(true);
  };
  const profileHandler = (e) => {
    e.preventDefault();
    setDashboard(false);
    setTransfer(false);
    setTopUp(false);
    setProfile(true);
    router.push("/profile");
  };

  const toggleHandler = () => {
    setShow(!show);
  };

  const NoHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!auth.userData.token) router.push("/login");
  }, [auth.userData.token, router]);

  useEffect(() => {
    if (auth.isLoading) setisLoading(true);
  }, [auth]);

  const logoutHandler = () => {
    deleteCookie("token");
    deleteCookie("id");
    dispatch(authAction.logoutThunk(auth.userData.token));
  };

  return (
    <>
      <div
        className={`${Styles["toggle"]} ${Styles["close-toggle"]}`}
        onClick={toggleHandler}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      {show && (
        <>
          <div className={Styles["bg-modal"]}></div>
          <div className={Styles["toggle-list"]}>
            <div
              className={`${Styles.dashboard} ${
                selectDashboard ? Styles.on : undefined
              }`}
              onClick={dashboardHandler}
            >
              {selectDashboard && <div className={Styles.rectangle}></div>}
              <i
                className={`bi bi-grid ${Styles.icon} ${
                  selectDashboard ? Styles.on : Styles.off
                }`}
              ></i>
              <p
                className={`${Styles.textDasboard} onClick={() => {
                router.push("/home/:id")
              }} ${Styles.close}`}
              >
                Dashboard
              </p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectTransfer ? Styles.on : undefined
              }`}
              onClick={transferHandler}
            >
              {selectTransfer && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-solid fa-arrow-up ${Styles.icon} ${
                  selectTransfer ? Styles.on : Styles.off
                }`}
              ></i>
              <p
                className={`${Styles.textDasboard} onClick={() => {
                
              }} ${Styles.close}`}
              >
                Transfer
              </p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectTopUp ? Styles.on : undefined
              }`}
              onClick={topupHandler}
            >
              {selectTopUp && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-solid fa-plus ${Styles.icon} ${
                  selectTopUp ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>Top Up</p>
            </div>
            <div
              className={`${Styles.dashboard} ${
                selectProfile ? Styles.on : undefined
              }`}
              onClick={profileHandler}
            >
              {selectProfile && <div className={Styles.rectangle}></div>}
              <i
                className={`fa-regular fa-user ${Styles.icon} ${
                  selectProfile ? Styles.on : Styles.off
                }`}
              ></i>
              <p className={`${Styles.textDasboard} ${Styles.close}`}>
                Profile
              </p>
            </div>
            <div className={Styles.logout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <p className={Styles["close"]}>Logout</p>
            </div>
          </div>
        </>
      )}
      <div className={Styles["container"]}>
        <div
          className={`${Styles.dashboard} ${
            selectDashboard ? Styles.on : undefined
          }`}
          onClick={dashboardHandler}
        >
          {selectDashboard && <div className={Styles.rectangle}></div>}
          <i
            className={`bi bi-grid ${Styles.icon} ${
              selectDashboard ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Dashboard</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectTransfer ? Styles.on : undefined
          }`}
          onClick={transferHandler}
        >
          {selectTransfer && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-solid fa-arrow-up ${Styles.icon} ${
              selectTransfer ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Transfer</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectTopUp ? Styles.on : undefined
          }`}
          onClick={topupHandler}
        >
          {selectTopUp && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-solid fa-plus ${Styles.icon} ${
              selectTopUp ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Top Up</p>
        </div>
        <div
          className={`${Styles.dashboard} ${
            selectProfile ? Styles.on : undefined
          }`}
          onClick={profileHandler}
        >
          {selectProfile && <div className={Styles.rectangle}></div>}
          <i
            className={`fa-regular fa-user ${Styles.icon} ${
              selectProfile ? Styles.on : Styles.off
            }`}
          ></i>
          <p className={`${Styles.textDasboard} ${Styles.close}`}>Profile</p>
        </div>
        <div
          className={Styles.logout}
          onClick={() => {
            setShowModal(true);
          }}
        >
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p className={Styles["close"]}>Logout</p>
        </div>
      </div>
      {showModal && (
        <>
          <div className={Styles.modal}>
            <div className={Styles["modal-container"]}>
              <p className={Styles.ask}>ARE YOU SURE WANT TO LOGOUT</p>
              <div className={Styles["container-btn"]}>
                <div
                  className={`${Styles.btn} ${
                    isLoading ? Styles.loading : undefined
                  }`}
                  onClick={logoutHandler}
                >
                  <p>YES</p>
                </div>
                <div className={Styles.btn} onClick={NoHandler}>
                  <p>NO</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {showTopUp && (
        <>
          <div className={Styles.modal}>
            <div className={Styles["modal-container-topup"]}>
              <div className={Styles["modal-top"]}>
                <p>Topup</p>
                <i
                  className={`fa-regular fa-x ${Styles["icon"]}`}
                  onClick={() => {
                    setShowTopUp(false);
                    setTopUp(false);
                  }}
                ></i>
              </div>
              <p className={Styles["title-topup"]}>
                Enter the amount of money, and click submit
              </p>
              <div className={Styles["input-topup"]}>
                <p>RP</p>
                <div className={Styles.line}></div>
                <input name="amount" onChange={amountHandler}></input>
              </div>
              {errMsg && (
                <p
                  style={{
                    color: "var(--red)",
                    fontWeight: "700",
                    textAlign: "center",
                    position: "absolute",
                    top: "270px",
                    left: "35%",
                  }}
                >
                  {errMsg}
                </p>
              )}
              <div
                className={`${Styles["topup-submit"]} ${
                  isLoading ? Styles.loading : undefined
                }`}
                onClick={submitHandler}
              >
                <p>Submit</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
