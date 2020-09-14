import * as React               from "react"               ;
import { makeStyles }           from "@material-ui/styles" ;
import * as Flux                from "../Flux/Flux"        ;
import { TPage, TGlobalConfig, AppStoreState } from "../Flux/AppStore"    ;
import AppStore from "../Flux/AppStore";

declare var config: any;

const useStyles = makeStyles({
  logo: {
    fontWeight  : "bolder"       ,
    color       : "#d85959"      ,
    display     : "inline-block" ,
    marginRight : 30             ,
  },
  menuItem: {
    height       : 47                      ,
    borderBottom : "3px solid transparent" ,
    lineHeight   : "47px"                  ,
    color        : "white"                 ,
    display      : "inline-block"          ,
    paddingLeft  : 12                      ,
    paddingRight : 12                      ,
    marginLeft   : 3                       ,
    marginRight  : 3                       ,
    cursor       : "pointer"               ,
    "&:hover"    : {
      color        : "#d85959"           ,
      borderBottom : "3px solid #d85959" ,
    }
  },
  active : {
    color        : "#d85959"           ,
    borderBottom : "3px solid #d85959" ,
  }
});

export function TopMenu() {
  const classes           = useStyles() ;
  const [state, setState] = React.useState<AppStoreState>({
    config       : { pages: [] , root: ""} ,
    subMenuItem  : {} as TPage   ,
    mainMenuitem : {} as TPage   ,
    template     : "Default"
  }) ;
  const menuItems = [] as JSX.Element[] ;

  React.useEffect(() => {
    const sub = AppStore.subscribeTo.All(state => setState(state));
    AppStore.actions.actionInit();
    /*
    const sub = Flux.subscriber.subscribe<Flux.AppStoreState>(Flux.appStoreId, (state) => {
      setState(state);
    });
    Flux.subscriber.sendAction(Flux.AppStoreActions.init())*/
    return () => sub.off();
  }, []);

  console.log("menu", state)

  for(let page of state!.config.pages) {
    if (!page.hidden) {
      menuItems.push(
        <div 
        className = {`${classes.menuItem} ${page.path === state.mainMenuitem.path ? classes.active : ""}`}
        onClick   = {() => window.history.pushState(page, "", page.path)}
        >{page.title}</div>
      );
    }
  }
 
  return <>
    <div className={`${classes.logo} d-none d-md-inline`}>
      {`{ S-Flux V3 }`}
    </div>
    {menuItems}
  </>
}