import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Confirmation.module.css";
import user from "src/assets/1.png";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Modal from "src/components/ModalConfirm";

import defaultPict from "src/assets/default-profile-pic.webp";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.transaction);

  const modalhandler = () => setModalOpen(!modalOpen);
  const transfer = transaction.transfer;

  const costing = (price) => {
    return (
      "Rp" +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  useEffect(() => {
    if (!transfer) router.push("/transfer");
  }, []);

  const numberPhone = (number) => {
    let phone = String(number).trim();
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.slice(1);
      return phone;
    }
  };

  return (
    <>
      <Header title={"Confirmation"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={css.side}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              {transfer && (
                <div className={css["image-name"]}>
                  {transfer.image && (
                    <Image
                      loader={myLoader}
                      src={transfer.image}
                      alt="user"
                      width={56}
                      height={56}
                      style={{ borderRadius: "10px" }}
                    />
                  )}
                  {!transfer.image && (
                    <Image
                      src={defaultPict}
                      alt="user"
                      style={{ borderRadius: "10px" }}
                      width={56}
                      height={56}
                    />
                  )}
                  <div>
                    <p className={css["username"]}>{transfer.fullname}</p>
                    <p className={css.status}>{numberPhone(transfer.phone)}</p>
                  </div>
                </div>
              )}
            </div>
            <div className={css["right-top2"]}>
              <p className={css["transaction"]}>Details</p>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Amount</p>
                {transfer && <p className={css.subdetails}>{transfer.total}</p>}
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Balance</p>
                {transfer && (
                  <p className={css.subdetails}>{costing(transfer.total)}</p>
                )}
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Date & Time</p>
                {transfer && <p className={css.subdetails}>{transfer.time}</p>}
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Notes</p>
                {transfer && <p className={css.subdetails}>{transfer.notes}</p>}
              </div>
            </div>
            <div
              className={css.continue1}
              onClick={() => {
                modalhandler();
              }}
            >
              <button className={css.continue}>Continue</button>
            </div>
          </aside>
        </section>
        {modalOpen && (
          <>
            <i
              className="fa-solid fa-x"
              style={{
                position: "fixed",
                fontSize: "21px",
                zIndex: "11",
                top: "200px",
                // right: "900px",
                right: "481px",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={modalhandler}
            ></i>
            <Modal />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
