export interface RRuleInput {
  freq?: string;
  count?: number;
  interval?: number;
  byweekday?: string[];
  dtstart?: string;
  until?: string; // 追加
}
