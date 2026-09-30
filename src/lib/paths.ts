export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL;
	const trimmed = path.replace(/^\//, '');
	return `${base}${trimmed}`;
}

export function mediaSrc(path: string | undefined): string | undefined {
	if (!path) return undefined;
	if (/^https?:\/\//i.test(path)) return path;
	return withBase(path);
}
