"use client";

import React from "react";
import { trackPhoneClick, trackEmailClick, trackSmsClick } from "@/lib/gtag";

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  location?: string;
  children: React.ReactNode;
}

export function SmsLink({ href, className, style, children }: Props) {
  return (
    <a href={href} className={className} style={style} onClick={() => trackSmsClick()}>
      {children}
    </a>
  );
}

export function PhoneLink({ href, className, style, location = "site", children }: Props) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => trackPhoneClick(location)}
    >
      {children}
    </a>
  );
}

export function TrackedPhoneLink({ href, className, style, location = "site", children }: Props) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => trackPhoneClick(location)}
    >
      {children}
    </a>
  );
}

export function TrackedEmailLink({ href, className, style, location = "site", children }: Props) {
  return (
    <a
      href={href}
      className={className}
      style={style}
      onClick={() => trackEmailClick(location)}
    >
      {children}
    </a>
  );
}
