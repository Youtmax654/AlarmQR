export type Alarm = {
  id: string;
  hour: number;
  minute: number;
  active: boolean;
};

export type Status = "none" | "ringing";
