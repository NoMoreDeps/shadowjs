import * as React     from "react"               ;
import { makeStyles } from "@material-ui/styles" ;
import { TopMenu } from "./TopMenu";

const useStyles = makeStyles({
  root: {
    backgroundColor : "#2a2020" ,
    height          : "50px"    ,
  },
 
});

export function Header() {
  const styles = useStyles();

  return <>
    <div className={`container-fluid ${styles.root}`} style={{position: "fixed", zIndex: 1000}}>
      <div className="ribbonR"><a href="https://github.com/sponsors/NoMoreDeps">Support Us</a></div>
      <div className="container">
        <TopMenu />
      </div>
    </div>  
  </>;
}