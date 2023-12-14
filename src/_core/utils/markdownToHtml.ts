import { unified } from "unified";
//@ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from 'rehype-external-links'

export default async function markdownToHtml(markdown: string): Promise<string> {
  const content = await unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeExternalLinks, {target: '_blank'})
    .use(rehypePrism as any)
    .use(rehypeStringify) // Serialize HTML syntax tree
    .process(markdown);

  return content.toString();
}