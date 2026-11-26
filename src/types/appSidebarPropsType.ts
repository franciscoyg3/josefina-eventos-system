import type { ReactNode } from "react";

export type LinksType = {
  title: string;
  href: string;
  icon: ReactNode;
  exact?: boolean;
};

export type AppSidebarPropsType = {
  links: LinksType[];
  action?: ReactNode;
};
