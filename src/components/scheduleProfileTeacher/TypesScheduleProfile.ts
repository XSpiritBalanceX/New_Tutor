export interface IScheduleProfileTeacherProps {
  schedule: {
    id: number;
    day: number;
    time_start: string;
    time_end: string;
  }[];
  languages: {
    id: number;
    language: number;
    level: number;
    price: number;
    description: string;
    files: { id: number; file: string }[];
  }[];
  teacher_name: string;
  teacher_id: number;
}

export interface ISelectedLesson {
  teacher_id: number;
  schedule_id: number;
  date: string;
  day: number;
  time_start: string;
  time_end: string;
}

export interface IWeekDaysResult {
  month: string;
  dateInWeek: string[];
  year: string;
  rangeDate: string;
  fullDate: string[];
  dateMobile: string[];
  currentWeek: number;
}

export interface IButtonTimeProps {
  id: number;
  name: string;
  value: string;
  cbHandleBookLessons: (id: number, date: string) => void;
  selectedLessons: ISelectedLesson[];
}

export interface IMessageAboutBookProps {
  selectedLessons: ISelectedLesson[];
  teacher_name: string;
  selectedLanguage: string;
  selectedTimeZone: string;
  cbHandleBookLessons: () => void;
}
