import Header from "./Header";
import Block from "./Block";

export default function Layout(props) {
  return (
    <>
      <Header admin={props.admin} list={props.list}/>
      <Block admin={props.admin}>{props.children}</Block>
    </>
  );
}
