import { test } from 'node:test';
import assert from 'node:assert/strict';
import { embedUrl } from '../src/lib/video.ts';
import { tagSlug } from '../src/lib/tags.ts';
import { markdownBase } from '../scripts/markdown-base.mjs';

test('video URLs validate hosts and support query ordering', () => {
 assert.equal(embedUrl('https://www.youtube.com/watch?feature=share&v=aqz-KE-bpKQ'), 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ');
 assert.equal(embedUrl('https://youtu.be/aqz-KE-bpKQ?t=10'), 'https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ');
 assert.equal(embedUrl('https://vimeo.com/123456'), 'https://player.vimeo.com/video/123456');
 for (const value of ['invalid', 'https://evil.test/youtube.com/watch?v=aqz-KE-bpKQ', 'https://youtube.com/watch?v=short', 'javascript:alert(1)']) assert.equal(embedUrl(value), undefined);
});
test('tag routes preserve simple tags and uniquely encode punctuation and Unicode', () => {
 assert.equal(tagSlug('rest'), 'rest');
 const tags = ['self care', 'self/care', 'C++', 'C#', '日本語', '~6162', 'ab'];
 const slugs = tags.map(tagSlug);
 assert.equal(new Set(slugs).size, tags.length);
 slugs.forEach(slug => assert.match(slug, /^[a-z0-9~-]+$/));
});
test('Markdown upload paths work for project and root sites without rewriting external media', () => {
 for (const base of ['/', '/MentalHealthBlog/']) {
  const plugin = markdownBase(base);
  const node = { url: '/uploads/photo.jpg' };
  plugin.image(node);
  assert.equal(node.url, `${base}uploads/photo.jpg`);
  plugin.image(node);
  assert.equal(node.url, `${base}uploads/photo.jpg`);
  const external = { url: 'https://example.com/uploads/photo.jpg' };
  plugin.image(external);
  assert.equal(external.url, 'https://example.com/uploads/photo.jpg');
 }
});
