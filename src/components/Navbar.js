import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import css from "src/styles/Navbar.module.css";
import Sidebar from "components/sidebar";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function Navbar({ children }) {
  const [show, setShow] = useState(false);

  const users = useSelector((state) => state.user);
  const transaction = useSelector((state) => state.transaction);

  const notifHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const sidebarHandler = (e) => {
    e.preventDefault();
    show === true && setShow(false);
  };

  const numberPhone = (number) => {
    let phone = String(number).trim();
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.slice(1);
      return phone;
    }
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
      <div className={css["navbar"]}>
        <div className={css["navbar-left"]}>
          <div className={css["on-mobile"]} onClick={sidebarHandler}>
            <Sidebar />
          </div>
          <p className={css.title}>FazzPay</p>
        </div>
        <div className={css["navbar-right"]}>
          <div className={css["mobile"]}>
            {users.profile.image && (
              <Image
                loader={myLoader}
                src={users.profile.image}
                alt="profile"
                width={56}
                height={56}
                style={{ cursor: "pointer", borderRadius: "10px" }}
              />
            )}
            <div className={css["name-phone"]}>
              <p className={css["greating"]}>Hello,</p>
              {users.profile.firstName && users.profile.lastName && (
                <p
                  className={css["navbar-name"]}
                >{`${users.profile.firstName} ${users.profile.lastName}`}</p>
              )}
              {/* <p className={css["navbar-phone"]}>+62 8139 3877 7946</p> */}
            </div>
          </div>
          <div className={css["pc"]}>
            {users.profile.image && (
              <Image
                loader={myLoader}
                src={users.profile.image}
                alt="profile"
                width={56}
                height={56}
                style={{ cursor: "pointer", borderRadius: "10px" }}
              />
            )}
            <div className={css["name-phone"]}>
              {users.profile.lastName && users.profile.firstName && (
                <p
                  className={css["navbar-name"]}
                >{`${users.profile.firstName} ${users.profile.lastName}`}</p>
              )}
              <p className={css["navbar-phone"]}>
                {numberPhone(users.profile.noTelp)}
              </p>
            </div>
          </div>
          <i
            className="fa-regular fa-bell"
            onClick={notifHandler}
            style={{
              fontSize: "1.6rem",
              color: "#4D4B57",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>
      {show && (
        <>
          <div className={css.modal}>
            {transaction.notification &&
              transaction.notification.map((data) => {
                if (data.type !== "send") {
                  return (
                    <>
                      <div className={css.card}>
                        <i
                          className="fa-solid fa-arrow-down"
                          style={{
                            color: "#1EC15F",
                            fontSize: "30px",
                            marginBottom: "0.5rem",
                          }}
                        ></i>
                        <div style={{ lineHeight: "15px" }}>
                          <p className={css["name"]}>
                            {data.type === "accept"
                              ? `Accept from ${data.fullName}`
                              : "Top-Up"}
                          </p>
                          <p className={css["price"]}>
                            {costing(parseInt(data.amount))}
                          </p>
                        </div>
                      </div>
                    </>
                  );
                }
                return (
                  <>
                    <div className={css.card}>
                      <i
                        className="fa-solid fa-arrow-up"
                        style={{
                          color: "#FF5B37",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <div style={{ lineHeight: "15px" }}>
                        <p className={css["name"]}>
                          Transfer to {data.fullName}
                        </p>
                        <p className={css["price"]}>
                          {costing(parseInt(data.amount))}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </>
      )}
      {children}
    </>
  );
}

export default Navbar;
