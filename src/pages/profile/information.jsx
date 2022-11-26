import React from "react";
import Header from "components/Navbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import css from "styles/ProfileInfo.module.css";

function personalInfo() {
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
                      value="Kolak"
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={css["input-bar"]}>
                    <label htmlFor="">Last Name</label>
                    <input
                      type="text"
                      value="Ibu"
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={css["input-bar"]}>
                    <label htmlFor="">Verified E-mail</label>
                    <input
                      type="text"
                      value="kolakibu@mail.com"
                      placeholder="Input Here..."
                    />
                  </div>
                  <div className={`${css["input-bar"]} ${css["input-phone"]}`}>
                    <div className={css["left"]}>
                      <label htmlFor="">Phone Number</label>
                      <input
                        type="text"
                        // value="+62 813-9387-7946"
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

export default personalInfo;
