### Get started

 ::- classes:bd-callout,bd-callout-danger elt:div nested
This section is a `*very quick*` overview that presents the way **S-Flux** is used to write new stores, a step by step documentation can be found in the `~**Using it**~` section 

To get started quickly with **S-Flux**, you can import the following items :

```typescript
import { registerStore, withEvents, TAwaitFor, TBaseStore } from "shadow-flux";
```

Once this is done, you can register your first store with the `registerStore` function.

**Here is a short summary on the use of imported objects**

[table format:csv variant:bordered,striped emp classes:table-sm] {{
Name           , Type         , Description
`**registerStore**`, **Function** , *Register a new store with all helpers methods around it.*
`**withEvents**`   , **Function** , *Creates a key-value hashmap to desribe all store's events available*
`**TAwaitFor**`    , **Type**     , *Describes the method prototype used to synchronize one or more stores with each other*
`**TBaseStore**`   , **Type**     , *Desribes the methods availables inside a real store class*
}}

Let's declare two stores, with an dependency between the two. The first store contains a value, the second must always contain the same squared value. Let's start by declaring 
the state of both stores, which will be of same type.

```typescript
type TState = {
  value: number;
}
```

Too easy, now let's prepare the actions available in the 2 stores. Let's start with the first one, the A. This one can perform 1 action, the one to update the value by any number.

```typescript
// We need to declare all store's actions in a Key-value hashmap
const storeA_Actions = {
  // Action
  async setValue(this: TBaseStore<TState>, payload: { value: number }) {
    // Here we can update the state
    this.nextState(payload);
  }
}
```

Now the second store
```typescript
const storeB_Actions = {
  // Action
  async setValue(this: TBaseStore<TState>, payload: void, For: TAwaitFor) {
    // We will wait for store 1 to finish first
    await For(store1.id);

    // Here we can update the state based on Store1
    this.nextState({
      value: store1.getState().value *  store1.getState().value
    });
  }
}
```

And then we have to register the store 
```typescript
const store1 = registerStore({
  // Actions
  actions: storeA_Actions

  // Initialize the state
  init(): TState {
    return { value: 0 }
  }
})

const store2 = registerStore({
  // Actions
  actions: storeB_Actions
  
  // Initialize the state
  init(): TState {
    return { value: 0 }
  }
})
```

To retreive data, we need to register for state change. Since we already now that store 1 will always finish after store 2, we an register for store 2 events.
```typescript
store2.subscribeTo.All(_ => {
  _state2 = _;
  _state1 = store1.getState();
})
```