import type { FooterSection } from '../model/footerType';

export function Section({ title, links }: FooterSection) {
  return (
    <div className='flex flex-col gap-3'>
      <h3 className='text-foreground text-sm font-medium'>{title}</h3>
      <ul className='space-y-2 text-sm'>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className='text-muted-foreground hover:text-foreground transition'>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
