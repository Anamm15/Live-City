export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  title: string;
  status: "Aktif" | "Ditutup";
  startDate: string;
  endDate: string;
}

export interface FullPollData extends PollData {
  options: PollOption[];
}

// Array yang berisi beberapa data polling dengan tanggal
export const polls: FullPollData[] = [
  {
    id: "poll-1",
    title: "Framework CSS mana yang paling sering Anda gunakan?",
    status: "Aktif",
    startDate: "1 Sep 2025",
    endDate: "15 Sep 2025",
    options: [
      { id: "opt-1-1", text: "Tailwind CSS", votes: 215 },
      { id: "opt-1-2", text: "Bootstrap", votes: 78 },
      { id: "opt-1-3", text: "MUI (Material-UI)", votes: 91 },
      { id: "opt-1-4", text: "Lainnya", votes: 32 },
    ],
  },
  {
    id: "poll-2",
    title: "Kapan waktu paling produktif Anda untuk coding?",
    status: "Aktif",
    startDate: "5 Sep 2025",
    endDate: "20 Sep 2025",
    options: [
      { id: "opt-2-1", text: "Pagi Hari (06:00 - 11:00)", votes: 120 },
      { id: "opt-2-2", text: "Siang Hari (11:00 - 16:00)", votes: 45 },
      { id: "opt-2-3", text: "Malam Hari (19:00 - 23:00)", votes: 180 },
      { id: "opt-2-4", text: "Tengah Malam (23:00 ke atas)", votes: 95 },
    ],
  },
  {
    id: "poll-3",
    title: "Polling ini sudah ditutup",
    status: "Ditutup",
    startDate: "20 Agu 2025",
    endDate: "31 Agu 2025",
    options: [
      { id: "opt-3-1", text: "Opsi A", votes: 100 },
      { id: "opt-3-2", text: "Opsi B", votes: 250 },
    ],
  },
];
