import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { StatTiles } from "./StatTiles";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", children, ...rest }) =>
    href.startsWith("/") ? <Link href={href} {...rest}>{children}</Link> : <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener" : undefined} {...rest}>{children}</a>,
  StatTiles,
};
