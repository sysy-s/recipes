import Header from "./Header";
import Block from "./Block";

export default function Layout(props) {
  return (
    <>
      <Header />
      <Block>{props.children}</Block>
    </>
  );
}
