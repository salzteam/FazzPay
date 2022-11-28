import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Header from "components/Navbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import css from "styles/ProfileInfo.module.css";

import authAction from "src/redux/action/User";

function PersonalInfo({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  const numberPhone = (number) => {
    let phone = String(number).trim();
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.slice(1);
      return phone;
    }
  };

  return (
    <>
      <Header />
      <main className={css["container"]}>
        <div className="container">
          <div className={`row ${css["main-content"]}`}>
            <div className="col-lg-3 col-md-4">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-md-8 col-12">
              <div className={css["profile-info"]}>
                <div className={css["title"]}>
                  <h1>Personal Information</h1>
                </div>
                <div className={css["definition"]}>
                  <p>
                    We got your personal information from the sign up proccess.
                    If you want to make changes on your information, contact our
                    support.
                  </p>
                </div>
                <form action="">
                  <div className={css["input-bar"]}>
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      value={users.profile.firstName}
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={css["input-bar"]}>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      value={users.profile.lastName}
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={css["input-bar"]}>
                    <label htmlFor="">Verified E-mail</label>
                    <p>{users.profile.email}</p>
                  </div>
                  <div className={`${css["input-bar"]} ${css["input-phone"]}`}>
                    <div className={css["left"]}>
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        value={numberPhone(users.profile.noTelp)}
                        placeholder="Input Here..."
                      />
                    </div>
                    <div className={css["right"]}>
                      <p>Manage</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
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

export default PersonalInfo;
