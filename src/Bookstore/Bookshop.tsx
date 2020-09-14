import * as React from "react";
import { sFDebugger } from "shadow-flux";
import BookshopStore from "./Stores/BookshopStore";

export function Bookshop() {
  const [state, setState] = React.useState<ReturnType<typeof BookshopStore.getState>>(BookshopStore.getState());

  React.useEffect(() => {
    BookshopStore.subscribeTo.onBookReceived(_ => setState(_));
    BookshopStore.actions.getBooks({});
  }, []);

  return <>
    <div id="main" role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4" style={{overflowY: "scroll", height: "calc(100vh - 50px)"}}>

      {JSON.stringify(state.books)}
    </div>
  </>;
}