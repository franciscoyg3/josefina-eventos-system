import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reservas"
};

export default function ReservationLayout({ children }: { children: React.ReactNode }) {
  return children;
}