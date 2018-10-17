import * as React from "react";

export default function(props: React.Props<any>): JSX.Element {
  return <span style={{color:"#932981", borderBottom: "1px dotted" }}>{props.children}</span>;
}