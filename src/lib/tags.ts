export function tagSlug(tag: string): string {
	return /^[a-z0-9-]+$/.test(tag) ? tag : `~${Array.from(new TextEncoder().encode(tag), (byte) => byte.toString(16).padStart(2, '0')).join('')}`;
}
