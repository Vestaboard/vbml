import { makeCalendar, VBMLDays } from "../../calendar";
import { runConformanceSuite } from "./support";

interface CalendarInput {
  month: string;
  year: string;
  days?: VBMLDays;
  defaultDayColor?: 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71;
  hideSMTWTFS?: boolean;
  hideDates?: boolean;
  hideMonthYear?: boolean;
}

runConformanceSuite<CalendarInput, number[][]>({
  suiteName: "Calendar conformance",
  suiteDir: "calendar",
  run: ({
    month,
    year,
    days = {},
    defaultDayColor,
    hideSMTWTFS,
    hideDates,
    hideMonthYear,
  }) =>
    makeCalendar(
      month,
      year,
      days,
      defaultDayColor,
      hideSMTWTFS,
      hideDates,
      hideMonthYear
    ),
});
