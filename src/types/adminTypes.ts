export type BookingStatus =
  | "UNDER_REVIEW"
  | "AWAITING_PAYMENT"
  | "APPROVED"
  | "REJECTED"
  | "EXPIRED"
  | "CANCELLED";

export type PaymentStatus = "PAID" | "PENDING" | "EXPIRED";

export type AdminBooking = {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  eventDate: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  eventType: string;
  services: string[];
  amount: number; // Kwanzas
  status: BookingStatus;
  deadline?: string;
  rejectionReason?: string;
};

export type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bookingsCount: number;
  totalPaid: number;
  lastBookingDate?: string; // "YYYY-MM-DD"
};

export type AdminPayment = {
  id: string;
  reference: string;
  bookingCode: string;
  customerName: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  date: string; // ISO
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "INVITED";
  lastLogin?: string; // ISO
};

export type AdminService = {
  id: string;
  name: string;
  category: "PRINCIPAL" | "EXTRA";
  price: number; // Kwanzas
  unit: string; // "for event", "for guest"...
  description: string;
  active: boolean;
};
