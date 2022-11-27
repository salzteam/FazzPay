import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/History.module.css";
import user from "src/assets/1.png";
import user2 from "src/assets/image.png";

import transactionAction from "src/redux/action/Transaction";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import Recive from "components/ReciveHistory";
import Paid from "components/PaidHistory";

function Home() {
  const isData = true;
  const [filter, setFilter] = useState(false);
  const [filterSelect, setfilterSelect] = useState();

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);

  useEffect(() => {
    if (router.query.filter) {
      dispatch(
        transactionAction.HistoryLimitThunk(
          `page=1&limit=10&filter=${router.query.filter}`,
          auth.userData.token
        )
      );
    }
  }, [router]);

  useEffect(() => {
    dispatch(
      transactionAction.HistoryLimitThunk(
        "page=1&limit=10",
        auth.userData.token
      )
    );
  }, []);

  const filterHandler = (text) => {
    setfilterSelect(text);
  };

  const costing = (price) => {
    return (
      "Rp" +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  return (
    <>
      <Header title={"History"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={css["bottom-right"]}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Transaction History</p>
            <div className={`${css.filter} ${css.filterHead}`}>
              <div
                className={css.show}
                onClick={() => {
                  setFilter(filter ? false : true);
                  console.log(filter);
                }}
              >
                {!filterSelect ? "-- Select Filter --" : filterSelect}
              </div>
              {filterSelect && (
                <i
                  className={`fa-regular fa-x ${css["icon"]}`}
                  onClick={() => {
                    setfilterSelect(null);
                    router.push("/dashboard/history");
                  }}
                ></i>
              )}
              <div className={filter ? css.filterDownOn : css.filterDownOff}>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("WEEK");
                    setFilter(false);
                    router.push("/dashboard/history?filter=WEEK");
                  }}
                >
                  WEEK
                </p>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("MONTH");
                    setFilter(false);
                    router.push("/dashboard/history?filter=MONTH");
                  }}
                >
                  MONTH
                </p>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("YEAR");
                    setFilter(false);
                    router.push("/dashboard/history?filter=YEAR");
                  }}
                >
                  YEAR
                </p>
              </div>
            </div>
          </div>
          {isData ? (
            <div
              style={{ overflow: "auto", maxHeight: "47vh" }}
              className={css["containter-history"]}
            >
              {transaction.history &&
                transaction.history.map((data, index) => {
                  if (data.type !== "send") {
                    return (
                      <Recive
                        key={index}
                        image={data.image}
                        username={data.fullName}
                        type={data.type}
                        price={costing(parseInt(data.amount))}
                      />
                    );
                  }
                  return (
                    <Paid
                      key={index}
                      image={data.image}
                      username={data.fullName}
                      price={costing(parseInt(data.amount))}
                    />
                  );
                })}
            </div>
          ) : (
            <div>
              <div className={css["no-data"]}>No Data Available</div>
            </div>
          )}
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Home;
