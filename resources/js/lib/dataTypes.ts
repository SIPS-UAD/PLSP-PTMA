// TYPE
export type UserCard = {
  name: string;
  role: 'Admin' | 'Super Admin' | 'Anggota';
};

export type NavLink = {
  link: string;
  text: string;
};

export type Card = {
  title: string;
  imageUrl: string;
  date: string;
};

export type Container = {
  title: string;
  children: React.ReactNode;
};
// DATA

export const navigationsLink: NavLink[] = [
  { text: "BERANDA", link: "/" },
  { text: "TENTANG", link: "/about" },
  { text: "PERATURAN", link: "/rules" },
  { text: "PENDIRIAN LSP", link: "/about" },
  { text: "MATERI PELATIHAN", link: "/materials" },
  { text: "DASHBOARD", link: "/dashboard" },
];
