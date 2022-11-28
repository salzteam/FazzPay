import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "styles/status.module.css";
import Sidebar from "src/Components/Sidebar";
import profile from "src/assets/profile.png";
import { getCookie } from "cookies-next";
import Header from "src/Components/Header";
import Navbar from "src/Components/Navbar";
import Footer from "src/Components/Footer";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import defaultPict from "src/assets/default-profile-pic.webp";
import transactionAction from "src/redux/action/Transaction";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function Status({ data }) {
  const [success, setSuccess] = useState(false);
  const [failed, setfailed] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.transaction);
  const transfer = transaction.transfer;

  if (data) router.push("/login");

  const homeHandler = (e) => {
    e.preventDefault();
    dispatch(transactionAction.resetTransactionFulfilled);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (!data && !transaction.statusTransfer) router.push("/transfer/");
    if (!data && transaction.statusTransfer === "Success transfer")
      return setSuccess(true);
    setfailed(true);
  }, [transaction, router, data]);

  const costing = (price) => {
    return (
      "Rp" +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  const numberPhone = (number) => {
    let phone = String(number).trim();
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.slice(1);
      return phone;
    }
  };

  return (
    <>
      <Header title={"Status"} />
      <Navbar>
        <div className={styles["main-status"]}>
          <div className="col-lg-3">
            <Sidebar />
          </div>
          <div className={`col-lg-9 ${styles["status-info"]}`}>
            {success && (
              <>
                <div className={styles["success"]}>
                  <i className={"fa-solid fa-check"}></i>
                  {/* <i className={`fa-sharp fa-solid fa-x`}></i> */}
                </div>
                <p className={styles["status-text"]}>
                  <p>Transfer Success</p>
                </p>
              </>
            )}
            {failed && (
              <>
                <div className={styles["failed"]}>
                  <i className={"fa-sharp fa-solid fa-x"}></i>
                </div>
                <p className={styles["status-text"]}>
                  <p>Transfer Failed</p>
                </p>
              </>
            )}
            <div className={styles["info"]}>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Amount</p>
                {transaction.transfer && (
                  <p className={styles["info-value"]}>
                    {costing(transaction.transfer.total)}
                  </p>
                )}
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Balance Left</p>
                {transaction.transfer && (
                  <p className={styles["info-value"]}>
                    {costing(transaction.transfer.balanceleft)}
                  </p>
                )}
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Date & Time</p>
                {transaction.transfer && (
                  <p className={styles["info-value"]}>
                    {transaction.transfer.time}
                  </p>
                )}
              </div>
              <div className={styles["item-container"]}>
                <p className={styles["info-label"]}>Notes</p>
                {transaction.transfer && (
                  <p className={styles["info-value"]}>
                    {transaction.transfer.notes}
                  </p>
                )}
              </div>
            </div>
            <section className={styles["receiver"]}>
              <p className={styles["title"]}>Transfer to</p>
              <div className={styles["contact-item"]}>
                {transaction.transfer && (
                  <div className={styles["img"]}>
                    {transaction.transfer.image && (
                      <Image
                        loader={myLoader}
                        src={transaction.transfer.image}
                        alt="profile"
                        width={56}
                        height={56}
                        style={{ borderRadius: "10px" }}
                      />
                    )}
                    {!transaction.transfer.image && (
                      <Image
                        src={defaultPict}
                        alt="profile"
                        width={56}
                        height={56}
                        style={{ borderRadius: "10px" }}
                      />
                    )}
                  </div>
                )}
                <div className={styles["name-phone"]}>
                  {transaction.transfer && (
                    <p className={styles["name"]}>
                      {transaction.transfer.fullname}
                      {/* {`${props.transferData.receiverData.firstName} ${props.transferData.receiverData.lastName}`} */}
                    </p>
                  )}
                  {transaction.transfer && (
                    <p className={styles["phone"]}>
                      {numberPhone(transaction.transfer.phone)}
                      {/* {props.transferData.receiverData.noTelp | "-"} */}
                    </p>
                  )}
                </div>
              </div>
            </section>
            <section className={styles["buttons"]}>
              <a href="" target="_blank" rel="noreferrer">
                <button className={`btn ${styles["download"]}`}>
                  <i
                    className={`fa fa-download ${styles["icon-fontawesome"]}`}
                    aria-hidden="true"
                  ></i>
                  Download PDF
                </button>
              </a>
              <button
                className={`btn btn-primary ${styles["home"]}`}
                onClick={homeHandler}
              >
                Back to Home
              </button>
            </section>
          </div>
        </div>
        <Footer />
      </Navbar>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });
  const id = getCookie("id", { req, res });
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

export default Status;
