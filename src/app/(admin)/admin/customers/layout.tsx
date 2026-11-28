import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
