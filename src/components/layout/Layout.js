import { useEffect, useState } from "react";

import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import Block from "./Block";

export default function Layout(props) {
  const [mobileView, setMobileView] = useState(window.innerWidth < 800);
  useEffect(() => {
    function resize() {
      setMobileView(window.innerWidth < 800);
    }
    window.addEventListener("resize", resize);
  });

  return (
    <>
      {!mobileView && <Header list={props.list} />}
      {mobileView && <HeaderMobile list={props.list} />}
      <Block>{props.children}</Block>
    </>
  );
}
