import grayMatter from "gray-matter";
import path from "path";
import markdownit from "markdown-it";
import shiki from "shiki";

async function transform(content, filePath) {
  if (!/\.md$/.test(filePath)) return null;

  let highlighter = await shiki.getHighlighter({
    theme: "nord",
  });
  let md = markdownit({
    html: true,
    highlight: (code, lang) => {
      return highlighter.codeToHtml(code, lang);
    },
  });

  let uri = path.basename(filePath);
  let [year, month, day, ...slugWithExtension] = uri.split("-");
  let date = new Date(`${year}-${month}-${day}`).toISOString();
  let [slug] = slugWithExtension.join("-").split(".md");

  let matter = grayMatter(content);

  let markdown = matter.content;

  let html = md.render(markdown);

  // comments syntax highlighting is not accessible
  let accessibleContent = html.replace(/#616E88/g, "#D8DEE9");

  let obj = JSON.stringify({
    ...matter,
    slug,
    date,
    content: accessibleContent,
  });

  return {
    code: `export default ${obj}`,
    map: { mappings: "" },
  };
}

export default () => ({ transform });
