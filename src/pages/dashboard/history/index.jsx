import React, { useState } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/History.module.css";
import user from "src/assets/1.png";
import user2 from "src/assets/image.png";

function Home() {
  const isData = true;
  const [filter, setFilter] = useState(false);
  return (
    <>
      <Header title={"HOME"} />
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
                onClick={() => {
                  setFilter(filter ? false : true);
                  console.log(filter);
                }}
              >
                -- Select Filter --
              </div>
              <div className={filter ? css.filterDownOn : css.filterDownOff}>
                <p className={filter ? css.filterDownOn2 : css.filterDownOff}>
                  Transfer In
                </p>
                <p className={filter ? css.filterDownOn2 : css.filterDownOff}>
                  Transfer Out
                </p>
              </div>
            </div>
          </div>
          {isData ? (
            <div>
              <div className={css["card"]}>
                <div className={css["image-name"]}>
                  <Image src={user} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>Accept</p>
                  </div>
                </div>
                <div>
                  <p className={css.recieve}>+Rp50.000</p>
                </div>
              </div>
              <div className={css["card"]}>
                <div className={css["image-name"]}>
                  <Image src={user2} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>Transfer</p>
                  </div>
                </div>
                <div>
                  <p className={css.paid}>-Rp149.000</p>
                </div>
              </div>
              <div className={css["card"]}>
                <div className={css["image-name"]}>
                  <Image src={user} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>Accept</p>
                  </div>
                </div>
                <div>
                  <p className={css.recieve}>+Rp50.000</p>
                </div>
              </div>
              <div className={css["card"]}>
                <div className={css["image-name"]}>
                  <Image src={user2} alt="user" width={56} height={56} />
                  <div>
                    <p className={css["username"]}>Samuel Suhi</p>
                    <p className={css.status}>Transfer</p>
                  </div>
                </div>
                <div>
                  <p className={css.paid}>-Rp149.000</p>
                </div>
              </div>
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
