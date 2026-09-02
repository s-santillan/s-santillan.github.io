/**
 * Wrap swizzle of @theme/DocItem/Layout.
 *
 * Reads `sidenotes: true` from frontmatter and stamps `sidenotes-page` on
 * <html>, which is what the page geometry in custom.css keys off.
 *
 * A wrap rather than an eject, so upstream's Layout keeps evolving under
 * us instead of going stale. Two things make that possible: DocItem
 * renders Layout inside DocProvider, so useDoc() resolves here; and
 * HtmlClassNameProvider composes with the ancestor's class via clsx
 * rather than replacing it, so `docs-doc-id-*` survives alongside ours.
 */
import React, {type ReactNode, useEffect} from 'react';
import Layout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {HtmlClassNameProvider} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): ReactNode {
  const {frontMatter} = useDoc();
  const sidenotes = (frontMatter as {sidenotes?: boolean}).sidenotes === true;
  const tocShown = !frontMatter.hide_table_of_contents;

  /**
   * The two flags are deliberately independent — a frontmatter key with
   * hidden reach over unrelated chrome is worse than one extra line. But
   * that leaves a combination which reads fine and renders wrong, with
   * the notes floating straight into the table of contents column.
   */
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && sidenotes && tocShown) {
      console.warn(
        '[marginalia] This post sets `sidenotes: true` without ' +
          '`hide_table_of_contents: true`, so its notes will land in the ' +
          'table of contents column. Set both.',
      );
    }
  }, [sidenotes, tocShown]);

  if (!sidenotes) {
    return <Layout {...props} />;
  }

  return (
    <HtmlClassNameProvider className="sidenotes-page">
      <Layout {...props} />
    </HtmlClassNameProvider>
  );
}
