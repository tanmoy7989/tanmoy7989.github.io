import type { Education, Experience } from '../types/cv';

export function normalizeYear(year: string): string {
  return year.replace(/--/g, ' - ').replace(/Present/gi, 'present');
}

function stripBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
}

function isBulletLine(line: string): boolean {
  return line.startsWith('- ');
}

function isLocationLine(line: string): boolean {
  return /,\s*[A-Z]{2}/.test(line) || /,\s*(USA|India|UK)\s*$/i.test(line);
}

export function toEducationEntry(entry: {
  degree: string;
  year: string;
  description: string;
}): Education {
  const lines = entry.description.split('\n').map((l) => l.trim()).filter(Boolean);
  const degreeLine = lines[0] ? stripBold(lines[0]) : '';
  const locationLine = lines[1] && !isBulletLine(lines[1]) ? lines[1] : '';
  const description = lines.slice(locationLine ? 2 : 1).join('\n');

  return {
    school: entry.degree,
    time: normalizeYear(entry.year),
    degree: degreeLine,
    location: locationLine,
    description,
  };
}

export function toExperienceEntry(entry: {
  title: string;
  year: string;
  description: string;
}): Experience {
  const lines = entry.description.split('\n').map((l) => l.trim()).filter(Boolean);
  const titleLines: string[] = [];
  let location = '';
  let bodyStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (isBulletLine(line)) {
      bodyStart = i;
      break;
    }
    if (line.startsWith('**')) {
      titleLines.push(stripBold(line));
      bodyStart = i + 1;
      continue;
    }
    if (!location && isLocationLine(line)) {
      location = line;
      bodyStart = i + 1;
      continue;
    }
    titleLines.push(line);
    bodyStart = i + 1;
  }

  return {
    company: entry.title,
    time: normalizeYear(entry.year),
    title: titleLines.join(' / '),
    location,
    description: lines.slice(bodyStart).join('\n'),
  };
}

function parseEndYear(time: string): number {
  const presentValues = ['present', 'now', 'current', 'today'];
  const end = time.split(' - ').pop()?.trim().toLowerCase() ?? '';
  if (presentValues.includes(end)) return Infinity;
  const yearMatch = end.match(/\d{4}/);
  return yearMatch ? parseInt(yearMatch[0], 10) : 0;
}

export function sortByEndDate<T extends { time: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => parseEndYear(b.time) - parseEndYear(a.time));
}
