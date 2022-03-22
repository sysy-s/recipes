import Header from "./Header";
import Block from "./Block";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Block>{children}</Block>
    </>
  );
}
