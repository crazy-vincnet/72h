"use client";

import type { ReactNode } from "react";

type HeroProps = {
  badge: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image: string;
  alt: string;
  children?: ReactNode;
  /** Pull subsequent content up over the hero gradient. */
  short?: boolean;
};

export default function Hero({
  badge,
  title,
  subtitle,
  image,
  alt,
  children,
}: HeroProps) {
  return (
    <section className="relative w-full h-[680px] md:h-[760px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-stack-md pt-20">
        <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-outline-variant/30 text-primary font-label-sm text-label-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {badge}
        </div>

        <h1 className="font-headline-xl-mobile text-headline-xl-mobile md:font-headline-xl md:text-headline-xl text-on-surface tracking-tight leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {subtitle}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}
