import React, { useEffect, useState } from "react";
import Layout from "components/LayoutAuth";
import PageTitle from "components/Header";
import styles from "styles/CreatePin.module.css";
import dynamic from "next/dynamic";
import userAction from "src/redux/action/User";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

const ReactCodeInput = dynamic(import("react-code-input"));

export default function CreatePin({ data }) {
  const [emptypin, setEmptyPin] = useState(true);
  const [pin, setPin] = useState(null);
  const [inputpin, setInputin] = useState(true);
  const [goto, setgoto] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  const checkEmptyPin = (pin) => {
    if (!pin || pin.length !== 6) return setEmptyPin(true);
    return setEmptyPin(false);
  };

  const changehandler = (e) => setPin(e);

  useEffect(() => {
    checkEmptyPin(pin);
  }, [pin]);

  const pinHandler = (e) => {
    e.preventDefault();
    const id = auth.userData.id;
    const token = auth.userData.token;
    const sendPin = parseInt(pin);
    dispatch(userAction.pinThunk(sendPin, id, token));
  };

  useEffect(() => {
    if (auth.userData.pin) router.push("/dashboard");
    if (user.isLoading) setEmptyPin(true);
    if (user.isFulfilled) {
      setInputin(false);
      setgoto(true);
    }
  }, [user]);

  return (
    <>
      <PageTitle title="Create Pin" />
      <Layout>
        {inputpin && (
          <>
            <h1 className={styles["h1"]}>
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </h1>
            <p className={styles["description"]}>
              Create 6 digits pin to secure all your money and your data in
              FazzPay app. Keep it secret and don’t tell anyone about your
              FazzPay account password and the PIN.
            </p>
            <form className={styles["form"]}>
              <div className={styles["code-wrapper"]}>
                <ReactCodeInput
                  type="number"
                  fields={6}
                  onChange={changehandler}
                  className={styles["input"]}
                />
              </div>
              <button type="submit" disabled={emptypin} onClick={pinHandler}>
                Confirm
              </button>
            </form>
          </>
        )}
        {goto && (
          <>
            <div className={styles["check-list"]}>
              <i className="fa-solid fa-check"></i>
            </div>
            <p className={styles.created}>Your PIN Was Successfully Created</p>
            <p className={styles.access}>
              Your PIN was successfully created and you can now access all the
              features in FazzPay.
            </p>
            <p
              className={styles.btn}
              onClick={() => {
                router.push("/dashboard");
              }}
            >
              Go To Dashboard
            </p>
          </>
        )}
      </Layout>
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
