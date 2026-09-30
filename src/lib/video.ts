export function embedUrl(value: string): string | undefined {
	try {
		const url = new URL(value);
		if (!['https:', 'http:'].includes(url.protocol)) return;
		const host = url.hostname.replace(/^www\./, '');
		let id: string | null | undefined;
		if (host === 'youtu.be') id = url.pathname.slice(1);
		if (['youtube.com', 'm.youtube.com', 'youtube-nocookie.com'].includes(host)) {
			id = url.pathname === '/watch' ? url.searchParams.get('v') : url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)\/?$/)?.[1];
		}
		if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
		if (['vimeo.com', 'player.vimeo.com'].includes(host)) {
			const match = url.pathname.match(/^\/(?:video\/)?(\d+)\/?$/);
			if (match) return `https://player.vimeo.com/video/${match[1]}`;
		}
	} catch { /* Invalid URLs are not embedded. */ }
	return undefined;
}
