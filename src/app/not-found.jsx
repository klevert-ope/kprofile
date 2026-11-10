import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <div className="error-box">
        <h1>Page not found</h1>
        <p>This address doesn’t point to a page in the portfolio.</p>
        <Link href="/">Return to the desktop</Link>
      </div>
    </main>
  );
}
