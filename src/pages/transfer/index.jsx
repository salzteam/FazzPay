import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "components/Header";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Footer from "components/Footer";
import css from "styles/Transfer.module.css";
import defaultPict from "src/assets/default-profile-pic.webp";
import icon from "src/assets/search.png";
import userAction from "src/redux/action/User";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isData = true;
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");

  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(
      userAction.getUser("page=1&limit=1000&search=", auth.userData.token)
    );
    dispatch(userAction.updateSearch(users.allsearch));
  }, []);

  useEffect(() => {
    if (users.allsearch) {
      let datas = [];
      users.allsearch.map((data) => {
        const fullName = `${data.firstName} ${data.lastName}`;
        if (fullName.toLowerCase().includes(search.toLowerCase())) {
          datas.push(data);
        }
      });
      router.push(`/transfer?search=${search}`);
      if (search.length === 0) router.push(`/transfer`);
      dispatch(userAction.updateSearch(datas));
    }
  }, [search]);

  const numberPhone = (number) => {
    let phone = String(number).trim();
    if (phone.startsWith("0")) {
      phone = "+62 " + phone.slice(1);
      return phone;
    }
    return "";
  };

  return (
    <>
      <Header title={"Transfer"} />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={`${css["bottom-right"]} ${css.side}`}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Search Receiver</p>
          </div>
          <div className={css.searchs}>
            <Image src={icon} className={css.searchImage} alt="search" />
            <input
              type="text"
              className={css.searchInput}
              placeholder="Search receiver here"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {users.search ? (
            <div className={css["container-card"]}>
              {users.search.map((data) => {
                return (
                  <>
                    <div
                      className={css["card"]}
                      onClick={() => {
                        router.push(`/ammount/${data.id}`);
                      }}
                    >
                      <div className={css["image-name"]}>
                        {data.image ? (
                          <Image
                            loader={myLoader}
                            src={data.image}
                            alt="user"
                            width={56}
                            height={56}
                            style={{ borderRadius: "10px" }}
                          />
                        ) : (
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
                          >{`${data.firstName} ${data.lastName}`}</p>
                          <p className={css.status}>
                            {numberPhone(data.noTelp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
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
