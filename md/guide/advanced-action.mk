### Action
An `**Action**` represents the way to formalize a request for a change of state of one or more `**Stores**`.

An `**Action**` must at least have a field named `**<Type>**` of string type. Stores receive this action as a Payload, and apart from the Type field, the rest of the possible fields are completely free.
A `**Store**` must display the different Actions available in order to facilitate the creation of Actions from `**Views**`.

Here you can find the action type definition :
```typescript
export type TAction = {
  type: string;
}
```

So if you have to define several Actions, you can then use the Typescript union type to group all your action in one definition.
```typescript
type SendAction = {
  type: "SEND_ACTION";
  ...
};

type ReceiveAction = {
  type: "RECEIVE_ACTION";
};

export type Actions = SendAction | ReceiveAction;
```

If every action is of type `**TAction**`, you don't need to explicitly add the `**TAction**` in the union definition. In that case the ***Flow Analysis*** of typescript compiler will resolve all possible type values based on the value of the Type field. If you add the `**TAction**` you will explicitly add a generic string and you will loose the benefit of using the Flow Analysis.