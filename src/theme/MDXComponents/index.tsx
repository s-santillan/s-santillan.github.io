/**
 * Wrap swizzle of @theme/MDXComponents.
 *
 * Puts the site's own components on the MDX scope, so a post can use them
 * with no import line. Everything upstream provides is passed through
 * untouched.
 *
 * <Gallery> inside <Sidenote> is UNSUPPORTED and not detected. A grid inside a
 * paragraph makes the parser close the paragraph early and breaks hydration,
 * which is the same rule that forces a note to be a span. Both components sit
 * on this scope, so the combination is easy to write by accident — it will
 * simply misbehave. Decided 2026-08-29: not supported, no warning.
 */
import MDXComponents from '@theme-original/MDXComponents';
import {MarginNote, Sidenote} from '@site/src/components/Marginalia';
import {Gallery} from '@site/src/components/Gallery';
import {OpenerText} from '@site/src/components/OpenerText';

export default {
  ...MDXComponents,
  Sidenote,
  MarginNote,
  Gallery,
  OpenerText,
};
