import { profile } from '../settings'
import { template } from '../settings'

export function highlightAuthor(authors: string): string {
	let result = authors
	const names = ['T. Sanyal', profile.author_name]
	for (const name of names) {
		if (result.includes(name)) {
			result = result.replaceAll(name, `<span class='font-medium text-accent'>${name}</span>`)
		}
	}
	return result.replace(/\*\*(.+?)\*\*/g, '$1')
}

export function trimExcerpt(excerpt: string): string {
	const excerptLength = template.excerptLength
	return excerpt.length > excerptLength ? `${excerpt.substring(0, excerptLength)}...` : excerpt
}
