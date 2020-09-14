[bs-button ref:BtnGetStarted classes:btn-lg] {{
  "label"    : "Get Started" ,
  "type"     : "info"     ,
  "outlined" : false         ,
  "onClick"  : "history.pushState({path: '/guide'}, '', '/guide')"
}}
[bs-button ref:BtnGetStarted2 classes:btn-lg] {{
  "label"    : "Get Started" ,
  "type"     : "info"     ,
  "outlined" : false         ,
  "onClick"  : "history.pushState({path: '/guide'}, '', '/guide')"
}}
[marks classes:index-top] {{
  { Shadow-Flux }

  *Unidirectional dataflow* implementation based on [facebook`s flux pattern](https://facebook.github.io/flux/)

  @@BtnGetStarted@@
}}


[marks classes:col ref:COL01] {{
**Shadow-Flux** is a unidirectional dataflow implementation, which allows synchronizing the actions of an application to ensure visual consistency of data, 
and keep simplicity in their management, even if the amount of information grows over time.
___ ::- classes:d-md-none
}}

[mermaid classes:col ref:COL02] {{
graph LR
    A[Action] -->|Stacked| B[Dispatcher]
    B --> C1[Store 1]
    B --> C3[Store N]
    C1 -->|Emit change| D[Views]
    C3 -->|Emit change| D[Views]
    D -->|Call to action| A
}}

[marks classes:col,output variant:bgLight ref:COL03] {{
* Views trigger actions
* All actions are stacked in the dispatcher
* The dispatcher distributes the actions
* Stores process actions and update their state
* Views are notified of any changes
}}

[bs-grid variant:bgDLight]{{
  col-md,col-lg-12|@@COL01@@
  col-md,col-lg-6|@@COL02@@
  col-md,col-lg-6|@@COL03@@
}}

[marks classes:container]{{
The **FLux pattern** is a representation of a unidirectional data flow. This way of representing the life cycle of an information will ensure that for each cycle, all components using the data will be at the same level of information.

The **Dispatcher** will stack the **Actions**, then redistribute them to the **Stores**, which in turn will process or not the information. Once the information has been processed, each **Store** will notify the **View(s)** that more up-to-date data is available. The **View(s)** will then update their display accordingly.

An **Action** can be triggered by a **View**, a **Store**, or any other source, such as a server. In all cases, each **Action** will be processed sequentially by the **Dispatcher**.
}}

[marks variant:bgDLight classes:container]{{
  
**`Shadow-flux`** provides a very streamlined approach, so you don't need to declare either the dispatcher or the stores. Only a definition of store actions is necessary, and Shadow-Flux generates on-the-fly all the helper methods, as well as all the subscription methods, with full typescript intellisense.  
  
}}

[marks classes:container]{{
Given this simple store definition :  

```typescript
  // State type
type CounterState = {
  counter: number;
};

// Events
const _events = Flux.withEvents({
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

export default Flux.registerStore({
  id: "Counter",
  async init(): CounterState { 
    return { counter: 0 };
  },
  actions : _actions,
  events  : _events
});
```

All you need to do when you want to use the store :

```typescript
import CounterStore from "path-to-store";

// CounterStore will be of type :
{
  getState() : CounterState ;
  id         : string       ;
  events: {
    All          : string ;
    ForceCounter : string ;
  },
  subscribeTo: {
    All          : ((state: CounterState) => void) => { off: () => void };
    ForceCounter : ((state: CounterState) => void) => { off: () => void };
  },
  actions: {
    increase   : () => void                             ;
    decrease   : () => void                             ;
    setCounter : (payload: { counter: number }) => void ;
  }
}
```

The `**CounterStore`** object will provide all actions methods generated from the store actions, and all subscription method for each events 
}}

[marks classes:index-top,index-top-get-started] {{
  @@BtnGetStarted2@@
}}

[marks fetch:/shadowjs/md/footer.mk classes:footer pElt:div]{{
}}