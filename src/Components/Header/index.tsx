import React, { FC } from "react";
import Icon from "../../../public/images/add-list-1 1.svg";
import ProfileImage from "../../../public/images/Michael Thibodeaux 1.png";
import Logo from "../../../public/images/logo.png";
import styles from "./index.module.css";
import Image from "next/image";

interface HeaderProps {
  title: string;
  setAddView: () => void;
}

const Header: FC<HeaderProps> = ({ setAddView }) => (
  <header className={styles.header}>
    <div className={styles.logoSection}>
      <Image src={Logo} alt={""} width={121} height={56} />
    </div>
    <div className={styles.profileSection}>
      <Image
        style={{ cursor: "pointer" }}
        onClick={setAddView}
        src={Icon}
        width={30}
        height={30}
        alt={""}
      />
      <div className={styles.profileImagWrapper}>
        <Image
          sizes="(min-width: 200px) 20vw"
          src={ProfileImage}
          width={98}
          height={98}
          alt={""}
        />
        <p>Sadikali</p>
      </div>
    </div>
  </header>
);

export default Header;
