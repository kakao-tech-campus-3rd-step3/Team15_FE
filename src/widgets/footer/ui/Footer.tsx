import { BOTTOMBAR_LINKS } from '../config/footerLinks';
import { Github } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  const githubLink = BOTTOMBAR_LINKS.find(
    (l) => /github/i.test(l.label) || /github\.com/i.test(l.href),
  );

  return (
    <footer className='bg-background w-full border-t'>
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-semibold tracking-tight'>휴 쉼</h3>
            <p className='text-muted-foreground text-sm'>
              마음을 쉬게 하는 공간, 휴심입니다. 언제든 편히 방문하세요.
            </p>
          </div>

          {githubLink ? (
            <a
              href={githubLink.href}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted-foreground hover:text-foreground hover:bg-accent inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition'
            >
              <Github className='h-4 w-4' />
              <span>{githubLink.label || 'GitHub'}</span>
            </a>
          ) : null}
        </div>

        <div className='text-muted-foreground mt-6 text-xs'>
          © {year} Team15. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
