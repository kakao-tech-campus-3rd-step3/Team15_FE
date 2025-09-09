import { SOCIALS } from '../config/footerLinks';

export function Socials() {
  return (
    <div className='mt-2 flex items-center gap-3'>
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith('http') ? '_blank' : undefined}
          rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={s.label}
          className='text-muted-foreground hover:text-foreground transition'
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
