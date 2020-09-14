### Visualizer

S-Flux V3 comes with an integrated State Visualizer, in order to help understanding what is happening during all cycles. To enable it, import the sfDebug windows.

```typescript
// Import the debug visualizer
import { sFDebugger } from "shadow-flux";

// Enable it
sFDebugger.setOn();
```

Then you will be able to check data acrooss cycles.

![Visualizer](/shadowjs/assets/vizu.png)