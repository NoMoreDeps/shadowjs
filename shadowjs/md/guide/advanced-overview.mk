### Bare metal setup
**This section is for those who want to use S-Flux as close as possible to the FLUX pattern, or those who were using S-Flux prior to version 3.**

The **FLux** pattern is a representation of a unidirectional data flow. This way of representing the life cycle of an information will ensure that for each cycle, all components using the data will be at the same level of information.

The `**Dispatcher**` will stack the `**Actions**`, then redistribute them to the `**Stores**`, which in turn will process or not the information. Once the information has been processed, each `**Store**` will notify the `**View(s)**` that more up-to-date data is available. The `**View(s)**` will then update their display accordingly.

An `**Action**` can be triggered by a `**View**`, a `**Store**`, or any other source, such as a server. In all cases, each `**Action**` will be processed sequentially by the Dispatcher.