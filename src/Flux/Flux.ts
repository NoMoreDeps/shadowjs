export default {voidExp: 0};

if (window.location.pathname.length > 1) {
  const path = window.location.pathname.endsWith("/") ?  window.location.pathname.substr(0, window.location.pathname.length -1): window.location.pathname ;
  window.history.pushState({ path }, "", path);
  console.log({ path }, "", path)
}