
export interface SentinelContract {
  submit_report: (reportText: string) => Promise<void>;
  counter: () => Promise<number>;
  reports: (index: number) => Promise<string | null>;
}
export const contract = {}; // Mock contract object
