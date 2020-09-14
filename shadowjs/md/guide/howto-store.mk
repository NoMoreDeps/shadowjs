### Stores

In **S-Flux**, `stores` are used to store information. A `store` is responsible for a precise perimeter, called scope. 
This perimeter will include its *data model*, as well as the *business or technical rules* it needs.

Basically, a `store` is a class that extends the `BaseStore` class. This class must describe the data model, as well as the rules applicable to this data model. 
To do this, the data model will be stored in a `State` field, and the rules described by `methods` that can be triggered externally by the application.

A `store` should only manage its own data. However, it can rely on data from another `store`, if necessary, during the execution of one of its `rules`, to fill its data.

In order to simplify the declaration, as well as `store` usage, **S-Flux** has introduced a simplification on top of the *original Pattern*, allowing to hide a certain complexity level, and reducing at the same time some tedious declarations necessary to retreive data. Be aware that the simplification is a helper, but underneath, the original pattern is kept and used by **S-Flux**.

```typescript
// We need to use one simple function to register a new store
import { registerStore } from "shadow-flux";

// The registerStore function will take only one parameter, as described below.
// registerStore : (def: TStoreDefinition) => StoreWrapper
```

[marks ref:01]{{
  Each action is an async function that can take 2 parameters.
  * Optional `payload: any`, the payload that will be processed by the action
  * Optional `For: async (...ids: string[]) => void`, a method to call if you want to wait some other stores to finish first.

  If any state change is made during the process, you can trigger an event to notify views. This is done by the return value, of type : 

  [table format:csv separator:; emp theme:dark]{{
  Type;Description
  `undefined`; a global event (All), the default one for any change
  `null`; no change, does not notify
  `string`; the event you want to trigger
  `string[]`; the event list to trigger
  }}
}}

###### Here the list of properties that can be filled in the declaration
[table format:csv separator:| variant:bordered,triped classes:table-sm,d-none,d-lg-block emp]{{
  Name| Required| Type| Desciption
  **id**| *No*| `string`| The unique store id, if not specified, will be a random Guid
  **localActions**| *No*| `boolean`| Since an action method name is a unique ActionKey, if 2 stores have the same action defined, both will be triggered. This is the way the pattern works. But if you don't want that for any reason, a unique internal ActionKey will be set to ensure all methods are unique for this store.
  **actions**| *Yes*| `KeyValue\<string, asyncMethod\>`| @@01@@
  **events**| *No*| `KeyValue\<string, string\>` | KeyValue fields describing all the events that can be triggered for this store.
  **init**| *Yes*| `() => State` | This method set or reset the state to its initial value. It is **very** important that this method returns a value of the `State Type`, because this return type is used to **infer** the State type.
  **dispatchHandler**| *No* | `asyncMethod` | An async method of the same type as any other action. It is used as a fallback action to handler any `ActionKey` that has not be processed by an action. This is the only action needed in the `original` use of the pattern.
}}

[marks classes:outputNoBg,d-block,d-lg-none,noTr]{{
|Name|Required|
|-|-|
|**Name**    |**id**|
|**Required**| *No*|
|**Type**    | `string`|
___
The unique store id, if not specified, will be a random Guid
}}

[marks classes:outputNoBg,d-block,d-lg-none,noTr]{{
|Name|Required|
|-|-|
|**Name**    |**localActions**|
|**Required**| *No*| 
|**Type**    |`boolean`|
___
Since an action method name is a unique ActionKey, if 2 stores have the same action defined, both will be triggered. This is the way the pattern works. But if you don't want that for any reason, a unique internal ActionKey will be set to ensure all methods are unique for this store.
}}

[marks classes:outputNoBg,d-block,d-lg-none,noTr]{{
|Name|Required|
|-|-|
|**Name**    |**actions**| 
|**Required**|*Yes*| 
|**Type**    |`Hash\<asyncMethod\>`|
___
Each action is an async function that can take 2 parameters.
  * Optional `payload: any`, the payload that will be processed by the action
  * Optional `For: async (...ids: string[]) => void`, a method to call if you want to wait some other stores to finish first.

  If any state change is made during the process, you can trigger an event to notify views. This is done by the return value, of type : 

  [table format:csv separator:; emp theme:dark]{{
  Type;Description
  `undefined`; a global event (All), the default one for any change
  `null`; no change, does not notify
  `string`; the event you want to trigger
  `string[]`; the event list to trigger
  }}
}}

[marks classes:outputNoBg,d-block,d-lg-none,noTr]{{
|Name|Required|
|-|-|
|**Name**    |**events**| 
|**Required**|*No*| 
|**Type**    |`Hash\<string\>` |
___
KeyValue fields describing all the events that can be triggered for this store.
}}

[marks classes:outputNoBg,d-block,d-lg-none]{{
|Name|Required|
|-|-|
|**Name**    |**init**|
|**Required**| *Yes*|
|**Type**    | `() => State` |
___
This method set or reset the state to its initial value. It is **very** important that this method returns a value of the `State Type`, because this return type is used to **infer** the State type.
}}

[marks classes:outputNoBg,d-block,d-lg-none,noTr]{{
|Name|Required|
|-|-|
|**Name**    |**dispatchHandler**|
|**Required**|*No* |
|**Type**    |`asyncMethod` |
___
An async method of the same type as any other action. It is used as a fallback action to handler any `ActionKey` that has not be processed by an action. This is the only action needed in the `original` use of the pattern.
}}

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

export default registerStore({
  id: "Counter",
  async init(): CounterState { 
    return { counter: 0 };
  },
  actions : _actions,
  events  : _events
});
```

In return, **S-Flux** will create the store, all wrapper method to call declared actions, and all wrapper methods to subscribe to declared events. The correspondng object you will receive in return of the registerStore call is : 

```typescript
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