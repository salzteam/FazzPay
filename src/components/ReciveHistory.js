import React from "react";
import Image from "next/image";
import css from "styles/Home.module.css";

import defaultPict from "src/assets/default-profile-pic.webp";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function ReciveHistory({ image, username, price, type, status }) {
  return (
    <>
      <div className={css["card"]}>
        <div className={css["image-name"]}>
          {image ? (
            <Image
              loader={myLoader}
              src={image}
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
            <p className={css["username"]}>{username}</p>
            {type === "accept" ? (
              <p className={css.status}>Accept</p>
            ) : (
              <p className={css.status}>Top-Up</p>
            )}
          </div>
        </div>
        {status !== "pending" ? (
          <div>
            <p className={`${css.recive}`}>+{price}</p>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "0.3rem", alignItems: "center" }}>
            <i className="bi bi-clock" style={{ fontSize: "12px" }}></i>
            <p className={`${css.recive} ${css.pending}`}>{price}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ReciveHistory;
