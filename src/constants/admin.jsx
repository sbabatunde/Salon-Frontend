// src/components/sidebarData.js
import { CalendarCheck, Users, Scissors, BarChart2, Settings, ClipboardList, Flower2, BookOpen } from "lucide-react";

export const sidebarLinks = [
  { label: "Dashboard", path: "", icon: <BarChart2 /> },
  { label: "Appointments", path: "appointments", icon: <CalendarCheck /> },
  { label: "Clients", path: "clients", icon: <Users /> },
  { label: "Blog", path: "blogs", icon: <BookOpen /> },
  // { label: "Stylists", path: "stylists", icon: <Scissors /> },
  { label: "Styles", path: "styles", icon: <Flower2 /> },
  { label: "Services", path: "services", icon: <ClipboardList /> },
  { label: "Inventory", path: "inventory", icon: <ClipboardList /> },
  { label: "Reports", path: "reports", icon: <BarChart2 /> },
  { label: "Manage Site", 
    path: "settings",
    icon: <Settings />,
    children: [
      { path: "settings", label: "Business Profile" },
      { path: "video", label: "Site Video" },
    ],
  },
  
];

export const stats = [
  { label: "Today's Appointments", value: 8, icon: <CalendarCheck className="w-6 h-6 text-orange-500" /> },
  { label: "Total Clients", value: 245, icon: <Users className="w-6 h-6 text-orange-500" /> },
  { label: "Stylists", value: 6, icon: <Scissors className="w-6 h-6 text-orange-500" /> },
  { label: "Revenue (₦)", value: "120,000", icon: <BarChart2 className="w-6 h-6 text-orange-500" /> },
];

export const appointments = [
  { id: 1, client: "Ada Obi", service: "Bridal Styling", stylist: "Lola", date: "2025-05-07", time: "10:00 AM", status: "Confirmed" },
  { id: 2, client: "Jane Doe", service: "Coloring", stylist: "Chinwe", date: "2025-05-07", time: "12:00 PM", status: "Pending" },
];

export const clients = [
  { id: 1, name: "Ada Obi", phone: "08012345678", email: "ada@example.com", lastVisit: "2025-04-30" },
  { id: 2, name: "Jane Doe", phone: "08087654321", email: "jane@example.com", lastVisit: "2025-04-25" },
];
