export type PollOption = {
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
  options: PollOption[];
  selectedOptionId: number | null;
};

export type PollOptionsFormData = {
  label: string;
};

export type PollCreateFormData = {
  title: string;
  description: string;
  type: "VOTING" | "SURVEY";
  status: "ACTIVE" | "CLOSED";
  options: PollOptionsFormData[];
};

export type PollUpdateFormData = {
  title?: string;
  description?: string;
  type?: "VOTING" | "SURVEY";
  status?: "ACTIVE" | "CLOSED";
  options?: PollOptionsFormData[];
};
