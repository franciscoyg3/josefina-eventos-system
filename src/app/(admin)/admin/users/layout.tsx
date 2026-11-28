import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuários",
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
