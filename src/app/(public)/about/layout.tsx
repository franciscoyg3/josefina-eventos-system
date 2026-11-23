import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sobre"
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}