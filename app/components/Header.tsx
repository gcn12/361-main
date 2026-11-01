import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <Link href="/" className="text-lg font-semibold">
        The Red Carpet
      </Link>
      <nav className="flex gap-12 text-lg font-semibold">
        <Link href="/search">Search</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
}
