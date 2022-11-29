import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Header from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Profile.module.css";
import Image from "next/image";
import Head from "components/Header";

import sample from "../../assets/avatar.webp";
import axios from "axios";
import authAction from "src/redux/action/User";
import Loader from "components/Loader";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function Index({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [toLogout, setLogout] = useState(false);
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  const changeImageHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLoading(true);
      let image = new FormData();
      image.append("image", e.target.files[0]);
      const baseUrl = `https://fazzpay-rose.vercel.app/user/image/${auth.userData.id}`;
      axios
        .patch(baseUrl, image, {
          headers: { Authorization: `Bearer ${auth.userData.token}` },
        })
        .then((result) => {
          const profileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${auth.userData.id}`;
          axios
            .get(profileUrl, {
              headers: {
                Authorization: `Bearer ${auth.userData.token}`,
              },
            })
            .then((data) => {
              setLoading(false);
              dispatch(authAction.profileidThunk(data.data));
            })
            .catch((err) => {
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
            });
        });
    }
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    setLogout(true);
    setTimeout(() => {
      setLogout(false);
    }, 1000);
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
      <Head title={"Profile"}>
        <Header title={"HOME"} />
        <main className={css["container"]}>
          <div className="container">
            <div className={`row ${css["main-content"]}`}>
              <div className={`col-lg-3 col-md-4 ${css["only-mobile"]}`}>
                <Sidebar logoutModal={toLogout} />
              </div>
              {isLoading && (
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    width: "100vh",
                  }}
                >
                  <Loader />
                </div>
              )}
              <div className="col-lg-9 col-md-8 col-12">
                <div className={css["profile-content"]}>
                  <div className={css["profile-detail"]}>
                    <div className={css["top-content"]}>
                      <div className={css["photo"]}>
                        {users.profile.image ? (
                          <Image
                            loader={myLoader}
                            alt="profile"
                            src={users.profile.image}
                            placeholder="blur"
                            blurDataURL={"./assets/avatar.jpg"}
                            onError={() => "./assets/avatar.jpg"}
                            width={80}
                            height={80}
                            style={{ borderRadius: "10px" }}
                            objectFit="cover"
                          />
                        ) : (
                          <Image
                            alt="profile"
                            src={sample}
                            placeholder="blur"
                            blurDataURL={"./assets/avatar.jpg"}
                            onError={() => "./assets/avatar.jpg"}
                            width={80}
                            height={80}
                            style={{ borderRadius: "10px" }}
                            objectFit="cover"
                          />
                        )}
                      </div>
                      <div className={css["name-phone"]}>
                        <label htmlFor="images">
                          <div className={css["edit"]}>
                            <i className="fa-solid fa-pen"></i>
                            <p>Edit</p>
                          </div>
                        </label>
                        <input
                          className={"d-none"}
                          type="file"
                          id={"images"}
                          onChange={changeImageHandler}
                        ></input>
                        <div className={css["name"]}>
                          {users.profile.firstName && (
                            <p>{`${users.profile.firstName} ${users.profile.lastName}`}</p>
                          )}
                        </div>
                        <div className={css["phone"]}>
                          {users.profile.noTelp && (
                            <p>{numberPhone(users.profile.noTelp)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={css["profile-btn"]}>
                      <button
                        onClick={() => {
                          router.push("profile/information");
                        }}
                      >
                        <p>Personal Information</p>
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("profile/change-password");
                        }}
                      >
                        <p>Change Password</p>
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          router.push("profile/change-pin");
                        }}
                      >
                        <p>Change PIN</p>
                        <span>
                          <i className="fa-solid fa-arrow-right"></i>
                        </span>
                      </button>
                      <button onClick={logoutHandler}>Logout </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </Head>
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

export default Index;
