import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCompanies } from '../../../lib/companies';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const companies = getCompanies();
  return companies.map((company) => ({ slug: company.id }));
}

function toHostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'N/A';
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const companies = getCompanies();
  const company = companies.find((c) => c.id === slug);

  if (!company) {
    return {
      title: 'Company not found · Lahore Software Houses',
    };
  }

  return {
    title: `${company.name} · Lahore Software Houses`,
    description: company.focusArea,
  };
}

export default async function CompanyPage({ params }: Props) {
  const { slug } = await params;
  const companies = getCompanies();
  const company = companies.find((c) => c.id === slug);

  if (!company) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-8">
      <header className="space-y-3">
        <p className="text-xs text-slate-400">
          <Link href="/" className="hover:text-teal-300">
            ← Back to all companies
          </Link>
        </p>
        <h1 className="text-3xl font-semibold md:text-4xl">{company.name}</h1>
        {company.focusArea ? (
          <p className="max-w-2xl text-sm text-slate-300 md:text-base">
            {company.focusArea}
          </p>
        ) : null}
      </header>

      <section className="space-y-4 text-sm text-slate-200">
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Links
          </h2>
          <div className="flex flex-wrap gap-2">
            {company.websiteUrl ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-teal-300">
                Website: {toHostLabel(company.websiteUrl)}
              </span>
            ) : null}
            {company.linkedInUrl ? (
              <a
                href={company.linkedInUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-slate-700"
              >
                View on LinkedIn
              </a>
            ) : null}
            {!company.websiteUrl && !company.linkedInUrl ? (
              <p className="text-xs text-slate-400">
                No external links provided yet.
              </p>
            ) : null}
          </div>
        </div>

        <p className="text-xs text-slate-500">
          This company entry is generated from the{' '}
          <code>Top Software Houses</code> table in the project README. You can
          propose edits via pull request on GitHub.
        </p>
      </section>
    </main>
  );
}

