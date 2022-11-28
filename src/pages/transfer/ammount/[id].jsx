import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Header from "src/pages/Components/Header";
import Navbar from "src/pages/Components/Navbar";
import Sidebar from "src/pages/Components/Sidebar";
import Footer from "src/pages/Components/Footer";
import css from "styles/Ammount.module.css";
import user from "src/assets/1.png";
import { useRouter } from "next/router";
import pen from "src/assets/Vector-pen.png";
import defaultPict from "src/assets/default-profile-pic.webp";
import transactionAction from "src/redux/action/Transaction";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function Home({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [width, setWidth] = useState(10);
  const [ErrorMsg, setErrorMsg] = useState();

  const users = useSelector((state) => state.user);

  if (!data) router.push("/login");

  const selectMonth = (month) => {
    if (month === 1) return "January";
    if (month === 2) return "February";
    if (month === 3) return "March";
    if (month === 4) return "April";
    if (month === 5) return "May";
    if (month === 6) return "June";
    if (month === 7) return "July";
    if (month === 8) return "August";
    if (month === 9) return "September";
    if (month === 10) return "October";
    if (month === 11) return "November";
    if (month === 12) return "December";
  };

  const confirmHandle = (e) => {
    e.preventDefault();
    setErrorMsg();
    if (amount.length === 0) return setErrorMsg("Input Amount First!");
    if (amount < 10000) return setErrorMsg("Amount Minimum Rp 10.000");
    let date = new Date();
    let month = date.getUTCMonth("id-ID") + 1; //months from 1-12
    let day = date.getUTCDate("id-ID");
    let year = date.getUTCFullYear("id-ID");
    let hour = date.getHours("id-ID");
    let minutes = date.getMinutes("id-ID");
    let time = `${selectMonth(month)} ${day}, ${year} - ${hour}.${minutes
      .toString()
      .padStart(2, "0")}`;
    const datas = data.data;
    const dataSend = {
      receiverId: datas.id,
      image: datas.image,
      fullname: `${datas.firstName} ${datas.lastName}`,
      noTelp: datas.noTelp,
      total: amount,
      balanceleft: parseInt(users.profile.balance) - parseInt(amount),
      time: time,
      notes: notes,
    };
    dispatch(transactionAction.confirmationThunk(dataSend));
    router.push(`/transfer/confirmation/${datas.id}`);
  };

  const priceHandler = (e) => {
    const letters = /^[A-Za-z]+$/;
    if (e.target.value.match(letters)) {
      return (e.target.value = "");
    }
    let v = e.target.value.replace(/[^\dA-Z]/g, "");
    e.target.value = v
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
      .replace(/[^0-9]+$/, "");
    if (!e.target.value) setWidth(10);
    if (e.target.value !== ".") setWidth(e.target.value.length);
    if (e.target.value.includes(".")) {
      const data = e.target.value.split(".").join("");
      return setAmount(data);
    }
    setAmount(e.target.value);
  };

  const inputHandler = (e) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    if (amount.length === 0) setWidth(10);
  }, [amount]);

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
      <Header title={"Transfer"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={`${css.side}`}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              {data && (
                <div className={css["image-name"]}>
                  {data && data.data.image && (
                    <Image
                      loader={myLoader}
                      src={data.data.image}
                      alt="user"
                      width={56}
                      height={56}
                      style={{ borderRadius: "10px" }}
                    />
                  )}
                  {!data.data.image && (
                    <Image
                      src={defaultPict}
                      alt="user"
                      width={56}
                      height={56}
                      style={{ borderRadius: "10px" }}
                    />
                  )}
                  <div>
                    <p
                      className={css["username"]}
                    >{`${data.data.firstName} ${data.data.lastName}`}</p>
                    <p className={css.status}>
                      {numberPhone(data.data.noTelp)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className={css["right-top2"]}>
              <div className={css.type}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </div>
            </div>
            <div className={css["input-transfer"]}>
              {amount && <p className={css.rp}>Rp</p>}
              <input
                className={css.searchImage}
                style={{ width: width + "ch" }}
                type="text"
                name="amount"
                placeholder="0.00"
                onChange={priceHandler}
              />
            </div>
            {data && (
              <div className={css.availability}>{`${costing(
                users.profile.balance
              )} Available`}</div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className={`${css["input-transfer2"]} ${css.on}`}>
                <i className="bi bi-pencil"></i>
                <input
                  className={css.notes}
                  type="text"
                  name="notes"
                  placeholder="Add some notes"
                  onChange={inputHandler}
                />
              </div>
            </div>
            {ErrorMsg && (
              <p
                style={{
                  color: "var(--red)",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {ErrorMsg}
              </p>
            )}
            <div
              className={css.continue1}
              // onClick={() => {
              //   confirmHandle;
              //   // router.push("/confirmation/:");
              // }}
            >
              <button className={css.continue} onClick={confirmHandle}>
                Continue
              </button>
            </div>
          </aside>
        </section>
      </div>
      <Footer />
    </>
  );
}

export const getServerSideProps = async ({ params, req, res }) => {
  const id = params.id;
  const token = getCookie("token", { req, res });
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
        data: null,
      },
    };
  }
};

export default Home;
