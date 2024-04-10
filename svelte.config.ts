import { typescript, scss, postcss } from "svelte-preprocess";
import { cssModules, linearPreprocess } from "svelte-preprocess-cssmodules";
import autoprefixer from "autoprefixer";
import type { PreprocessorGroup } from "svelte/types/compiler/preprocess";
interface SvelteConfig {
  preprocess?: PreprocessorGroup | PreprocessorGroup[];
  [key: string]: any;
}
const config: SvelteConfig = {
  //抛出css 供其他webpack 插件使用,如果没有其他处理css代码的loader 的话，会报错，所以webpack.config.ts 里面必须要有处理css 的loader
  emitCss: true,
  preprocess: linearPreprocess([
    typescript(),
    scss(),
    postcss({
      plugins: [autoprefixer()],
    }),
    cssModules({
      mode: "scoped",
      useAsDefaultScoping: true,
      localIdentName: "[name]-[local]-[hash:base64:3]",
    }),
  ]),
  compilerOptions: {
    cssHash: ({ css, hash }) => {
      return `ass-${hash(css)}`;
    },
  },
};

export default config;
