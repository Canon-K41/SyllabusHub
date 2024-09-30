export interface classData{
  class_id: string,
  title: string,
  instructor: string,
  university: string,
  description: string,
  url: string,
  duration: string,
  exdata: string[],
  rrule: {
    freq: string,
    interval: number,
    count: number,
    byweekday: string[],
    dtstart: string,
  }
}

