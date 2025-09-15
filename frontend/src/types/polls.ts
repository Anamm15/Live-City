export type PollsOption = {
  id: number;
  label: string;
  voteCount: number;
};

export type Poll = {
  id: number;
  shortId: string;
  title: string;
  description: string;
  status: "ACTIVE" | "CLOSED";
  type: "VOTING" | "SURVEY";
  startDate: string;
  endDate: string;
  options: PollsOption[];
  selectedOptionId: number | null;
};
