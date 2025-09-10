import { Separator } from '@/shared/ui/shadcn/separator';
import { BOTTOMBAR_LINKS, SECTIONS } from '../config/footerLinks';
import { Section } from './Section';
import { Socials } from './Socials';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-background w-full border-t'>
      {/* Top section */}
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-4'>
          {/* Brand */}
          <div className='flex flex-col gap-3'>
            <div className='text-xl font-semibold tracking-tight'>휴 쉼</div>
            <p className='text-muted-foreground text-sm'>
              제품 개선 제안과 피드백을 언제든 환영합니다.
            </p>
            <Socials />
          </div>

          {/* Dynamic sections */}
          {SECTIONS.map((section) => (
            <Section key={section.title} {...section} />
          ))}
        </div>
      </div>

      {/* Separator */}
      <Separator />

      {/* Bottom bar */}
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
          <p className='text-muted-foreground text-xs'>© {year} Team15. All rights reserved.</p>

          <div className='flex items-center gap-4 text-xs'>
            {BOTTOMBAR_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className='text-muted-foreground hover:text-foreground transition'
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
