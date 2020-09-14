import { registerStore, withEvents, TAwaitFor, TBaseStore, TActionHandler} from "shadow-flux";

// Flux.sFDebugger.setOn();

declare var global_config: TGlobalConfig;

export type AppStoreState = {
 mainMenuitem  : TPage         ;
 subMenuItem   : TPage | null  ;
 template      : string        ;
 config        : TGlobalConfig ;
}

export type  TPage = {
  title    ?: string  ;
  name      : string  ;
  template ?: string  ;
  path      : string  ;
  md       ?: string  ;
  hidden   ?: boolean ;
  pages    ?: TPage[] ;
}

export type TGlobalConfig = {
  pages: TPage[];
}

export type Nav = {
  name : string ;
}

export const appStoreId = "AppStore";

const actions = {
  async updateTemplate(this: TBaseStore<AppStoreState>) {
    const newState = {
      ...this.getState()
    };

    if (newState.subMenuItem?.template) {
      this.nextState({
        ...newState,
        template: newState.subMenuItem?.template
      });
      return;
    }

    if (newState.mainMenuitem?.template) {
      this.nextState({
        ...newState,
        template: newState.mainMenuitem?.template
      });
      return;
    }

    this.nextState({
      ...newState,
      template: "Default"
    });
  },
  async actionNav(this: TBaseStore<AppStoreState>, payload: Nav) {
    try {
      let segments  = payload.name.split("/");
      segments.shift();
      segments        = segments.filter(_ => _.length) ;
      let pages       = this.getState().config?.pages  ;
      let item: TPage = null as unknown as TPage       ;
      let template    = "Default"                      ;

      
      segments.forEach(s => {
        item     = pages?.filter(_ => _.name === s)[0]! ;
        pages    = item.pages ?? []                     ;
        template = item.template ?? template            ;
      });

      if (segments.length === 0) {
        item = pages?.filter(_ => _.name === "index")[0]!
      }
      
      if (!item.md) {
        const md = await (await fetch(`/shadowjs/md${item?.path !== "/" ? item?.path.replace("/shadowjs","") : "/index"}.mk`)).text();
        item.md  = md;
      }
      
      this.nextState({
        ...this.getState(),
        mainMenuitem : this.getState().config?.pages.filter(_ => _.path === `/${segments[0]}`)[0] ?? item,
        subMenuItem  : segments.length > 1 ? item : null
      });
      (this as any).updateTemplate();
      //this.emit();
    } catch (ex) {
      console.error(ex);
    }
  },
  async actionInit(this: TBaseStore<AppStoreState>) {
    if (this.getState().mainMenuitem) {
      if (!this.getState().mainMenuitem?.md) {
        const md = await (await fetch(`/shadowjs/md${this.getState().mainMenuitem?.path !== "/" ? this.getState().mainMenuitem?.path.replace("/shadowjs","") : "/index"}.mk`)).text();
        const newState = { ...this.getState() };
        newState.mainMenuitem!.md = md;
        this.nextState(newState);
      }
    }
    //this.emit();
  }
}

export default registerStore({
  id: appStoreId,
  actions,
  init(this: any): AppStoreState {
    this.updateTemplate();

    window.onpopstate = (ev: PopStateEvent) => {
      this.sendAction(AppStoreActions.nav(ev.state.name));
    };

    const pushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
      pushState(...args);
      this.sendAction(AppStoreActions.nav(args[0].path));
    }

    console.log("Init", window.location.href);

    return {
      mainMenuitem : global_config.pages.filter(_ => _.path === "/")[0] ,
      subMenuItem  : null                                               ,
      config       : global_config
    } as any as AppStoreState;
  }
})

export const AppStoreActions = {
  init: () => ({ type: "actionInit" }),
  nav: (name: string) => ({ type: "actionNav", name })
}

// State type
type CounterState = {
  counter: number;
};

// Events
const _events = withEvents({
  ForceCounter: ""
})

type TThis = TBaseStore<CounterState>;

// Actions
const _actions = {
  async increase(this: TThis) {
    this.nextState({
      counter: this.getState().counter + 1
    });
  },
  async decrease(this: TThis) {
    this.nextState({
      counter: this.getState().counter - 1
    });
  },
  async setCounter(this: TThis, payload: { counter: number }) {
    this.nextState({
      counter: payload.counter
    });
    return _events.ForceCounter; // Return specific event 
  }
}
 const xx =  registerStore({
  id: "Counter",
  init(): CounterState {
    return { counter: 0 };
  },
  actions: _actions,
  events: _events
});
/*
import { sFDebugger } from "shadow-flux";
sFDebugger.setOn();*/
