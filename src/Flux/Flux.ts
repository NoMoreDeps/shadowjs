import { TGlobalConfig } from "./AppStore";

export default {voidExp: 0};
declare var global_config: TGlobalConfig;

if (window.location.pathname.length > 1) {
  const path = (window.location.pathname.endsWith("/") ?  window.location.pathname.substr(0, window.location.pathname.length -1): window.location.pathname)
    ?.replace(global_config.root, "");

  window.history.pushState({ path }, "", path);
  console.log({ path }, "", path)
}