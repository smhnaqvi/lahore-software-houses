import fs from 'node:fs';
import path from 'node:path';

export type Company = {
  id: string;
  name: string;
  websiteUrl?: string;
  linkedInUrl?: string;
  focusArea?: string;
  order: number;
};

function getReadmePath() {
  // When running inside /web, the repo root is one level up.
  return path.resolve(process.cwd(), '..', 'README.md');
}

export function parseCompaniesFromReadme(readmeContent: string): Company[] {
  const lines = readmeContent.split(/\r?\n/);
  const startIndex = lines.findIndex((line) =>
    line.trim().startsWith('## 🏛 Top Software Houses'),
  );

  if (startIndex === -1) {
    return [];
  }

  const tableLines: string[] = [];
  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim().startsWith('## ') || line.trim() === '---') {
      break;
    }

    if (line.trim().startsWith('|')) {
      tableLines.push(line);
    }
  }

  // Remove header + separator rows
  const dataLines = tableLines.filter(
    (line) => !line.includes('Company Name') && !line.includes(':---'),
  );

  const companies: Company[] = [];

  dataLines.forEach((row, index) => {
    const cells = row
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim());

    if (cells.length < 4) return;

    const [nameCell, websiteCell, linkedInCell, focusAreaCell] = cells;

    const name = nameCell.replace(/^\*\*(.+)\*\*$/, '$1').trim();

    const extractUrl = (markdownLink: string | undefined) => {
      if (!markdownLink) return undefined;
      const match = markdownLink.match(/\((https?:\/\/[^)]+)\)/);
      return match?.[1];
    };

    const websiteUrl = extractUrl(websiteCell);
    const linkedInUrl = extractUrl(linkedInCell);
    const focusArea = focusAreaCell || undefined;

    let slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    if (!slug) {
      slug = `company-${index + 1}`;
    }

    let uniqueSlug = slug;
    let counter = 2;
    // Ensure slugs are unique
    // eslint-disable-next-line no-constant-condition
    while (companies.some((c) => c.id === uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter += 1;
    }

    companies.push({
      id: uniqueSlug,
      name,
      websiteUrl,
      linkedInUrl,
      focusArea,
      order: index,
    });
  });

  return companies;
}

export function getCompanies(): Company[] {
  const readmePath = getReadmePath();
  const content = fs.readFileSync(readmePath, 'utf8');
  return parseCompaniesFromReadme(content);
}

