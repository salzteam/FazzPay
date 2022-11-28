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
  const [filter, setFilter] = useState(false);
  const [filterSelect, setfilterSelect] = useState();

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);
  const [query, setQuery] = useState({
    page: 1,
    limit: 50,
    filter: "MONTH",
  });

  useEffect(() => {
    dispatch(
      transactionAction.HistoryLimitThunk(
        `page=${query.page}&limit=${query.limit}&filter=${query.filter}`,
        // `page=1&limit=10&filter=${router.query.filter}`,
        auth.userData.token
      )
    );
  }, [query]);

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
                }}
              >
                {!filterSelect ? "-- Select Filter --" : filterSelect}
              </div>
              {filterSelect && (
                <i
                  className={`fa-regular fa-x ${css["icon"]}`}
                  onClick={() => {
                    setfilterSelect(null);
                    setFilter(false);
                    router.push("/dashboard/history");
                  }}
                ></i>
              )}
              <div className={filter ? css.filterDownOn : css.filterDownOff}>
                <p
                  className={filter ? css.filterDownOn2 : css.filterDownOff}
                  onClick={() => {
                    filterHandler("WEEK");
                    setQuery({ ...query, filter: "WEEK" });
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
                    setQuery({ ...query, filter: "MONTH" });
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
                    setQuery({ ...query, filter: "YEAR" });
                    setFilter(false);
                    router.push("/dashboard/history?filter=YEAR");
                  }}
                >
                  YEAR
                </p>
              </div>
            </div>
          </div>
          {transaction.history && transaction.history.length !== 0 ? (
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
                        status={data.status}
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
            <p className={css["no-data"]}>Nothing Transaction</p>
          )}
          <div className={css["pagination-container"]}>
            <div
              className={`${css["pagination-left"]} ${
                query.page === 1 ? css["block-pagination"] : undefined
              }`}
              onClick={() => {
                query.page !== 1 &&
                  setQuery({ ...query, page: query.page - 1 });
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </div>
            <div
              className={`${css["pagination-right"]} ${
                transaction.pagination &&
                query.page === transaction.pagination.totalPage
                  ? css["block-pagination"]
                  : undefined
              }`}
              onClick={() => {
                transaction.pagination &&
                  query.page !== transaction.pagination.totalPage &&
                  setQuery({ ...query, page: query.page + 1 });
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </div>
          </div>
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Home;
