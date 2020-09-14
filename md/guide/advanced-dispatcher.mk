### Dispatcher
The `**dispatcher**` is the only orchestrator of data communication during a cycle. When an `**Action**` is triggered, it is stacked in an internal queue of the `**Dispatcher**`.

Each `**Action**` is destacked in turn, then transmitted to all Stores.

The `**Dispatcher**` must distribute `**Actions**` in parallel, and manage dependencies between `**Stores**`.
```typescript
import { Dispatcher } from 'shadow-flux';

const dispatcher = new Dispatcher();
```

The `**Dispatcher**` will register each `**Store**` in the scope. Each Store should have a unique **TokenID** that is used as a unique identifier. You can set manually the token value when registering, or the dispatcher will set a **Guid** randomly.

```typescript
// The Dispatcher will generate a valid Guid and apply it to the store
dispatcher.regsiter(myStore);

// The Token is provided manually
dispatcher.register(myStore, "theStoreToken");
```

The **token** is used by the `**View(s)**` to access the `**Store**`'s state. The `**Dispatcher**` will never allow to access any `**Store**` directly. You can only retreive the state based on the **TokenId**.

The `**Stores**` never expose any other methods than the **getState(): T** one. Every change of the state should be the result of a previous `**Action**`.