import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lahore Software Houses',
  description:
    'A community-driven directory of software houses and IT companies in Lahore, Pakistan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-8">
          {children}
        </div>
      </body>
    </html>
  );
}

