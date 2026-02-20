import Link from 'next/link';
import { getCompanies } from '../lib/companies';

export const dynamic = 'error';

function toHostLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'N/A';
  }
}

export default function HomePage() {
  const companies = getCompanies();

  return (
    <main className="flex flex-1 flex-col gap-8">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-400">
          Lahore · Software Houses
        </p>
        <h1 className="text-balance text-3xl font-semibold md:text-4xl">
          Discover software houses in Lahore.
        </h1>
        <p className="max-w-2xl text-sm text-slate-300 md:text-base">
          This is a community-maintained directory. The list below is generated
          directly from the <code>Top Software Houses</code> table in the
          repository README.
        </p>
        <p className="text-xs text-slate-400">
          Want to add or update a company?{' '}
          <a
            href="https://github.com/smhnaqvi/lahore-software-houses"
            target="_blank"
            rel="noreferrer"
          >
            Open a pull request on GitHub.
          </a>
        </p>
      </header>

      <section className="flex-1">
        {companies.length === 0 ? (
          <p className="text-sm text-slate-400">
            No companies found. Check that the <code>Top Software Houses</code>{' '}
            table exists in the README.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
            <div className="hidden grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,2fr)] border-b border-slate-800 bg-slate-900/80 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-400 md:grid">
              <div>Company</div>
              <div>Website</div>
              <div>LinkedIn</div>
              <div>Focus</div>
            </div>
            <ul className="divide-y divide-slate-800">
              {companies.map((company) => (
                <li
                  key={company.id}
                  className="flex flex-col gap-3 px-4 py-4 text-sm hover:bg-slate-900/80 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,2fr)] md:items-center"
                >
                  <div className="space-y-1">
                    <Link
                      href={`/companies/${company.id}`}
                      className="text-base font-semibold text-slate-50 hover:text-teal-300"
                    >
                      {company.name}
                    </Link>
                    {company.focusArea ? (
                      <p className="text-xs text-slate-400 md:hidden">
                        {company.focusArea}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    {company.websiteUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-teal-300">
                        {toHostLabel(company.websiteUrl)}
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-500">
                        —
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    {company.linkedInUrl ? (
                      <a
                        href={company.linkedInUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200 hover:bg-slate-700"
                      >
                        LinkedIn profile
                      </a>
                    ) : (
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-500">
                        —
                      </span>
                    )}
                  </div>

                  <div className="hidden text-sm text-slate-300 md:block">
                    {company.focusArea ?? '—'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}

