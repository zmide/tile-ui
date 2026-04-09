// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light-default"
          }
        }
      ]);
      return plugins;
    }
  }
});
var docs = defineDocs({
  dir: "content/docs"
});
export {
  source_config_default as default,
  docs
};
