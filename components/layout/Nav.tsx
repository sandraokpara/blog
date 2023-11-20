"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"
import { useSession } from "next-auth/react"
import { buttonVariants } from "@/components/ui/Button"
import { blur, height, opacity, translate } from "@/lib/anim"
import styles from "@/styles/nav.module.scss"
import UserAuthNav from "../ui/UserAuthNav"
import { ThemeToggle } from "./ThemeToggle"
import { categories } from "@/lib/cat"

interface BodyProps {
    categories: LinkProps[];
    selectedLink: { isActive: boolean; index: number };
    setSelectedLink: React.Dispatch<React.SetStateAction<{ isActive: boolean; index: number }>>;
  }

interface LinkProps {
  title: string;
  href: string;
}

interface NavImageProps {
    src: string;
    isActive: boolean;
  }

const Body: React.FC<BodyProps> = ({ categories, selectedLink, setSelectedLink }) => {
  const getChars = (word: string) => {
    let chars: JSX.Element[] = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span
          custom={[i * 0.02, (word.length - i) * 0.01]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  return (
    <div className={styles.body}>
      {categories.map((link, index) => {
        const { title, href } = link;
        return (
          <Link key={`l_${index}`} href={`/category/${href}`}>
            <motion.p
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index });
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index });
              }}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
};

const Footer: React.FC = () => {
  const { data: session } = useSession();
  const stanqUser = session?.user;

  return (
    <div className={styles.footer}>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span>Made by:</span>Joshua Edo
        </motion.li>
      </ul>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span>Typography:</span> Google Fonts
        </motion.li>
      </ul>
      <ul>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
          className="space-x-2"
        >
          {stanqUser ? (
            <UserAuthNav gUser={stanqUser} />
          ) : (
            <Link href="/sign-in">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Sign In</span>
              </div>
            </Link>
          )}
          <ThemeToggle />
        </motion.li>
      </ul>
    </div>
  );
};

const NavImage: React.FC<NavImageProps> = ({ src, isActive }) => (
  <motion.div
    variants={opacity}
    initial="initial"
    animate={isActive ? "open" : "closed"}
    className={styles.imageContainer}
  >
    <Image src={`https://sandraokpara.sirv.com/blog/image/${src}`} fill alt={src} />
  </motion.div>
);

const Nav: React.FC = () => {
  const [selectedLink, setSelectedLink] = useState({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={`${styles.nav}`}
    >
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Body
            categories={categories}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
          />
          <Footer />
        </div>
        <NavImage
          src={categories[selectedLink.index].src}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.div>
  );
};

export default Nav;

