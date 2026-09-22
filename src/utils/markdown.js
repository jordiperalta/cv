/**
 * Adds an explicit HTML word-break opportunity after slashes in rendered text.
 * A standalone slash is handled as well so adjacent Markdown links can break.
 */
export const addSlashBreaks = (html) => {
  if (html === '/') return '/<wbr>';

  return html.replace(/(\S)\/(?=\S)/g, '$1/<wbr>');
};
