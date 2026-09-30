// CMS uploads use root paths; GitHub project sites need their base prefix.
export function markdownBase(base) {
  const prefix = '/' + base.split('/').filter(Boolean).join('/');
  function rewrite(node) {
    if (node.url?.startsWith('/uploads/')) {
      node.url = `${prefix === '/' ? '' : prefix}${node.url}`;
    }
  }
  return { name: 'upload-base-path', image: rewrite, link: rewrite, definition: rewrite };
}
