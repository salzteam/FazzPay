import React, { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "src/components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Home.module.css";
import authAction from "src/redux/action/User";
import transactionAction from "src/redux/action/Transaction";

import Recive from "components/ReciveHistory";
import Paid from "components/PaidHistory";

function Home({ data }) {
  const [topUp, setTopup] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  const getData = () => {
    dispatch(authAction.profileidThunk(data));
    dispatch(authAction.getDashboards(auth.userData.token, auth.userData.id));
    dispatch(
      transactionAction.HistoryNotifThunk(
        "page=1&limit=20",
        auth.userData.token
      )
    );
  };

  const topupHandler = () => {
    setTopup(true);
    setTimeout(() => {
      setTopup(false);
    }, 1000);
  };

  useEffect(() => {
    // if (!auth.userData.token) router.prefetch("/login");
    getData();
  }, []);

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
      <Header title={"Dashboard"} />
      <Navbar>
        <div className={css.container}>
          <div className={`col-lg-3 ${css.onMobile}`}>
            <Sidebar showModals={topUp} />
          </div>
          <div className="col-lg-9">
            <aside className={css.side}>
              <div className={css["side-top"]}>
                <div className={css["top-left"]}>
                  <p className={css.balance}>Balance</p>
                  <p className={css.price}>
                    {costing(users.profile.balance || 0)}
                  </p>
                  <p className={css.phone}>
                    {numberPhone(users.profile.noTelp)}
                  </p>
                  {/* <p className={css.phone}>+62 813-9387-7946</p> */}
                </div>
                <div className={`${css["top-btn"]} ${css.btnHide}`}>
                  <div
                    className={css.btn}
                    onClick={() => {
                      router.push("/transfer");
                    }}
                  >
                    <i className="fa-sharp fa-solid fa-arrow-up"></i>
                    <p>Transfer</p>
                  </div>
                  <div className={css.btn} onClick={topupHandler}>
                    <i className="fa-solid fa-plus"></i>
                    <p>Top Up</p>
                  </div>
                </div>
              </div>
              <div className={`${css["top-btn"]} ${css.hide}`}>
                <div
                  className={css.btn}
                  onClick={() => {
                    router.push("/transfer");
                  }}
                >
                  <i className="fa-sharp fa-solid fa-arrow-up"></i>
                  <p>Transfer</p>
                </div>
                <div className={css.btn}>
                  <i className="fa-solid fa-plus"></i>
                  <p>Top Up</p>
                </div>
              </div>
              <div className={css["bottom"]}>
                <aside className={css["right-side"]}>
                  <div className={css["left-top"]}>
                    <div>
                      <i
                        className="fa-solid fa-arrow-down"
                        style={{
                          color: "#1EC15F",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Income</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        {costing(users.dashboard.totalIncome)}
                      </p>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-arrow-up"
                        style={{
                          color: "#FF5B37",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Expense</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        {costing(users.dashboard.totalExpense)}
                      </p>
                    </div>
                  </div>
                  <div className={css["left-middle"]}>
                    <p className={css["plus"]}>+Rp65.000</p>
                    <div className={css["static"]}>
                      <div className={css.sat}></div>
                      <p>Sat</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.sun}></div>
                      <p>Sun</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.mon}></div>
                      <p>Mon</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.tue}>
                        <div className={css.circle}></div>
                        <div className={css["circle-blue"]}></div>
                      </div>
                      <p>Tue</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.wed}></div>
                      <p>Wed</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.thu}></div>
                      <p>Thu</p>
                    </div>
                    <div className={css["static"]}>
                      <div className={css.fri}></div>
                      <p>Fri</p>
                    </div>
                  </div>
                </aside>
                <div className={css["bottom-right"]}>
                  <div className={css["right-top"]}>
                    <p className={css["transaction"]}>Transaction History</p>
                    <p
                      className={css["seall"]}
                      onClick={() => {
                        router.push("dashboard/history");
                      }}
                    >
                      See all
                    </p>
                  </div>
                  {transaction.notification &&
                  transaction.notification.length !== 0 ? (
                    transaction.notification.map((data, index) => {
                      if (index < 4) {
                        if (data.type !== "send") {
                          return (
                            <Recive
                              key={index}
                              image={data.image}
                              username={data.fullName}
                              type={data.type}
                              status={data.status}
                              price={costing(parseInt(data.amount))}
                            />
                          );
                        }
                        if (data.type === "send") {
                          return (
                            <Paid
                              key={index}
                              image={data.image}
                              username={data.fullName}
                              price={costing(parseInt(data.amount))}
                            />
                          );
                        }
                      }
                    })
                  ) : (
                    <p className={css["no-data"]}>Nothing Transaction</p>
                  )}
                </div>
              </div>
            </aside>
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
  const pin = getCookie("pin", { req, res });
  if (pin) deleteCookie("pin", { req, res });
  try {
    if (!token) throw "NOT ACCESS TOKEN";
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${id}`;
    const result = await fetch(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await result.json();
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

export default Home;
