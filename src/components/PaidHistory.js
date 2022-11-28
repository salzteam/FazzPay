import React from "react";
import Image from "next/image";
import css from "styles/Home.module.css";

import defaultPict from "src/assets/default-profile-pic.webp";

const myLoader = ({ src, width, quality }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE}${src}?w=${width}&q=${quality || 75}`;
};

function PaidHistory({ image, username, price }) {
  return (
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
          <p className={css.status}>Transfer</p>
        </div>
      </div>
      <div>
        <p className={css.paid}>-{price}</p>
      </div>
    </div>
  );
}

export default PaidHistory;
