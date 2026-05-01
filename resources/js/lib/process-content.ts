import { slugify } from './slugify';

export function processContentHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const headings = doc.querySelectorAll('h2, h3');
    headings.forEach((heading) => {
        if (!heading.id) {
            heading.id = slugify(heading.textContent ?? '');
        }
    });

    const links = doc.querySelectorAll('a');
    links.forEach((link) => {
        const href = link.getAttribute('href') ?? '';

        if (href.endsWith('.md')) {
            link.setAttribute('href', href.slice(0, -3));
        }

        if (href.startsWith('http://') || href.startsWith('https://')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    return doc.body.innerHTML;
}
