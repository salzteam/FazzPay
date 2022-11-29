import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Header from "components/Navbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import css from "styles/ProfileInfo.module.css";
import Loader from "components/Loader";
import Head from "components/Header";

import authAction from "src/redux/action/User";
import axios from "axios";

function PersonalInfo({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [body, setBody] = useState();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);

  if (data === "NOT ACCESS TOKEN") router.push("/login");

  // useEffect(() => {
  //   if (body) {
  //     if (body.firstName || body.lastName) {
  //       if (body.firstName.length !== 0 || body.lastName !== 0) setAllow(true);
  //     }
  //   }
  //   console.log(body);
  // }, [body, allow]);

  const inputHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const editHandler = () => {
    setisEdit(!isEdit);
  };

  const saveHandler = () => {
    setLoading(true);
    const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${auth.userData.id}`;
    axios
      .patch(baseUrl, body, {
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
            setisEdit(false);
            dispatch(authAction.profileidThunk(data.data));
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
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
      <Head title={"Personal Information"}>
        <Header />
        <main className={css["container"]}>
          <div className="container">
            <div className={`row ${css["main-content"]}`}>
              <div className={`col-lg-3 col-md-4 ${css["only-mobile"]}`}>
                <Sidebar />
              </div>
              {isLoading && (
                <>
                  <div style={{ position: "fixed", left: "50%", top: "50%" }}>
                    <Loader />
                  </div>
                </>
              )}
              <div className="col-lg-9 col-md-8 col-12">
                <div className={css["profile-info"]}>
                  <div className={css["title"]}>
                    <h1>Personal Information</h1>
                  </div>
                  <div className={css["definition"]}>
                    <p>
                      We got your personal information from the sign up
                      proccess. If you want to make changes on your information,
                      contact our support.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      paddingRight: "1rem",
                      gap: "1rem",
                    }}
                  >
                    {isEdit && (
                      <p
                        className={
                          (body && body.firstName) || (body && body.lastName)
                            ? undefined
                            : css["not-allowed"]
                        }
                        style={{
                          color: "var(--primary)",
                          fontWeight: "600",
                          cursor: "pointer",
                          userSelect: "none",
                        }}
                        onClick={() => {
                          if (
                            (body && body.firstName) ||
                            (body && body.lastName)
                          )
                            return saveHandler();
                        }}
                      >
                        Save
                      </p>
                    )}
                    <p
                      style={{
                        color: "var(--primary)",
                        fontWeight: "600",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={editHandler}
                    >
                      {isEdit ? "Cancel" : "Edit"}
                    </p>
                  </div>
                  <form action="">
                    <div className={css["input-bar"]}>
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        placeholder={users.profile.firstName}
                        disabled={isEdit ? false : true}
                        onChange={(e) => {
                          if (isEdit) inputHandler(e);
                        }}
                      />
                    </div>
                    <div className={css["input-bar"]}>
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder={users.profile.lastName}
                        disabled={isEdit ? false : true}
                        onChange={(e) => {
                          if (isEdit) inputHandler(e);
                        }}
                      />
                    </div>
                    <div className={css["input-bar"]}>
                      <label htmlFor="">Verified E-mail</label>
                      <p>{users.profile.email}</p>
                    </div>
                    <div
                      className={`${css["input-bar"]} ${css["input-phone"]}`}
                    >
                      <div className={css["left"]}>
                        <label htmlFor="">Phone Number</label>
                        <input
                          type="text"
                          value={numberPhone(users.profile.noTelp)}
                          placeholder="Input Here..."
                          disabled={true}
                        />
                      </div>
                      <div className={css["right"]}>
                        <p
                          onClick={() => {
                            router.push("/profile/edit-phone");
                          }}
                        >
                          Manage
                        </p>
                      </div>
                    </div>
                  </form>
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

export default PersonalInfo;
