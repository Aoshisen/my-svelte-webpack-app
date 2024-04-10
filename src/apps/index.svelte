<script lang="ts">
  export let name = "ass";
  import Component from "../components/index.svelte";
</script>

<!-- //这是一个注释 来看看具体的表现情况如何 -->
<h1 class="bold">
  {name}<a href="https://www.baidu.com" class="a-tag">yellow yee</a>
</h1>
<Component />

<style lang="scss" src="./index.scss"></style>
