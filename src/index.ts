import App from "./apps/index.svelte";
const current_name: string = "ass";
//这是一个单独的注释
console.log("this is index ", current_name);
new App({
  target: document.body,
  props: {
    name: current_name,
  },
});
