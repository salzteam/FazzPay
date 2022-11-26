import React from "react";
import Header from "components/Navbar";
import Footer from "components/Footer";
import Sidebar from "components/Sidebar";
import css from "styles/EditPhone.module.css";

function editPhone() {
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
              <div className={css["edit-content"]}>
                <div className={css["edit-title"]}>
                  <div className={css["title"]}>
                    <h1>Edit Phone Number</h1>
                  </div>
                  <div className={css["definition"]}>
                    <p>
                      Add at least one phone number for the transfer ID so you
                      can start transfering your money to another user.
                    </p>
                  </div>
                </div>
                <form action="">
                  <div className={css["input"]}>
                    <i className="fa-solid fa-phone"></i>
                    <p>+62</p>
                    <input type="text" />
                  </div>
                  <div className={css["edit-btn"]}>
                    <button>Edit Phone Number</button>
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

export default editPhone;
