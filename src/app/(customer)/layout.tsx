import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Área do Cliente",
    template: "Área do Cliente - %s",
  },
};

export default function CustomerLayout ({ children }: { children: React.ReactNode }) {
    return children
}