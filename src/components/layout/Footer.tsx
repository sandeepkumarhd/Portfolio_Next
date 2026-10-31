import { navItems, site, socialLinks } from "@/config/site";

export function Footer() {
  return (
    <footer className="mx-auto mt-6 flex max-w-6xl flex-col gap-8 border-t border-line px-5 py-10 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold text-fg">{site.name}</p>
        <p className="mt-1">
          © {site.copyrightYear} · {site.role} · {site.location}
        </p>
        <p className="mt-1 text-subtle">Built with Next.js, TypeScript, Tailwind CSS and Motion.</p>
      </div>

      <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="transition-colors hover:text-fg">
            {item.label}
          </a>
        ))}
      </nav>

      <ul className="flex items-center gap-4" aria-label="Elsewhere">
        {socialLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel={link.id === "email" ? undefined : "noopener noreferrer"}
              className="transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
