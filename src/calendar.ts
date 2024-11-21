const getCharacterCodeFoDigit = (digit: string): number =>
  digit === "0" ? 36 : parseInt(digit) + 26;
const getCharCodeForDay = (day: string): number => {
  switch (day) {
    case "Sun":
      return 19;
    case "Mon":
      return 13;
    case "Tue":
      return 20;
    case "Wed":
      return 23;
    case "Thu":
      return 20;
    case "Fri":
      return 6;
    case "Sat":
      return 19;
    default:
      return 0;
  }
};
interface VBMLDay {
  [key: string]: 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71;
}
export const showCalendar = (
  calendarMonth: string,
  calendarYear: string,
  vbmlDays: Array<VBMLDay>,
  defaultDayColor?: 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71,
  hideSMTWTFS?: boolean,
  hideDates?: boolean,
  hideMonthYear?: boolean
) => {
  const parsedDate = new Date(
    parseInt(calendarYear),
    parseInt(calendarMonth) - 1
  );
  const month = parsedDate.getMonth();
  const year = parsedDate.getFullYear();
  const numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).toString().split(" ")[0];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const offset = daysOfWeek.indexOf(firstDayOfMonth);
  const firstRowDays = [`1`, `${7 - offset}`];
  const secondRowDays = [`${7 - offset + 1}`, `${7 - offset + 7}`];
  const thirdRowDays = [`${7 - offset + 8}`, `${7 - offset + 14}`];
  const fourthRowDays = [`${7 - offset + 15}`, `${7 - offset + 21}`];
  const fifthRowDays = [
    `${7 - offset + 22}`,
    `${Math.min(7 - offset + numberOfDaysInMonth, numberOfDaysInMonth)}`,
  ];
  const numberOfDaysInLastRow =
    Math.min(7 - offset + numberOfDaysInMonth, numberOfDaysInMonth) -
    (7 - offset + 22) +
    1;
  const calendarDayColor = defaultDayColor || 65;
  const firstRow =
    firstRowDays[0] === firstRowDays[1]
      ? [
          0,
          0,
          0,
          hideDates ? 0 : getCharacterCodeFoDigit(firstRowDays[0]),
          0,
          ...Array.from({ length: offset }, () => 0),
          ...Array.from({ length: 7 - offset }, () => calendarDayColor),
          ...Array.from({ length: 22 - 12 }, () => 0),
        ]
      : [
          0,
          hideDates ? 0 : getCharacterCodeFoDigit(firstRowDays[0]),
          hideDates ? 0 : 44,
          getCharacterCodeFoDigit(firstRowDays[1]),
          0,
          ...Array.from({ length: offset }, () => 0),
          ...Array.from({ length: 7 - offset }, () => calendarDayColor),
          ...Array.from({ length: 22 - 12 }, () => 0),
        ];
  const secondRow = [
    ...(secondRowDays[0].split("").length > 1
      ? [
          hideDates
            ? 0
            : getCharacterCodeFoDigit(secondRowDays[0]?.split("")[0]),
          hideDates
            ? 0
            : getCharacterCodeFoDigit(secondRowDays[0]?.split("")[1]),
        ]
      : [0, hideDates ? 0 : getCharacterCodeFoDigit(secondRowDays[0])]),
    hideDates ? 0 : 44,
    ...(secondRowDays[1].split("").length > 1
      ? [
          hideDates
            ? 0
            : getCharacterCodeFoDigit(secondRowDays[1]?.split("")[0]),
          hideDates
            ? 0
            : getCharacterCodeFoDigit(secondRowDays[1]?.split("")[1]),
        ]
      : [hideDates ? 0 : getCharacterCodeFoDigit(secondRowDays[1]), 0]),
    ...(secondRowDays.length > 1 ? [] : [0]),
    ...Array.from({ length: 7 }, () => calendarDayColor),
    ...Array.from({ length: 22 - 12 }, () => 0),
  ];
  const thirdRow = [
    ...(thirdRowDays[0].split("").length > 1
      ? [
          hideDates
            ? 0
            : getCharacterCodeFoDigit(thirdRowDays[0]?.split("")[0]),
          hideDates
            ? 0
            : getCharacterCodeFoDigit(thirdRowDays[0]?.split("")[1]),
        ]
      : [0, hideDates ? 0 : getCharacterCodeFoDigit(thirdRowDays[0])]),
    hideDates ? 0 : 44,
    hideDates ? 0 : getCharacterCodeFoDigit(thirdRowDays[1]?.split("")[0]),
    hideDates ? 0 : getCharacterCodeFoDigit(thirdRowDays[1]?.split("")[1]),
    ...Array.from({ length: 7 }, () => calendarDayColor),
    ...Array.from({ length: 22 - 12 }, () => 0),
  ];
  const fourthRow = [
    hideDates ? 0 : getCharacterCodeFoDigit(fourthRowDays[0]?.split("")[0]),
    hideDates ? 0 : getCharacterCodeFoDigit(fourthRowDays[0]?.split("")[1]),
    hideDates ? 0 : 44,
    hideDates ? 0 : getCharacterCodeFoDigit(fourthRowDays[1]?.split("")[0]),
    hideDates ? 0 : getCharacterCodeFoDigit(fourthRowDays[1]?.split("")[1]),
    ...Array.from({ length: 7 }, () => calendarDayColor),
    ...Array.from({ length: 22 - 12 }, () => 0),
  ];

  const fifthRow =
    fifthRowDays.length === 0
      ? Array.from({ length: 22 }).map(() => 0)
      : [
          getCharacterCodeFoDigit(fifthRowDays[0]?.split("")[0]),
          getCharacterCodeFoDigit(fifthRowDays[0]?.split("")[1]),
          44,
          getCharacterCodeFoDigit(fifthRowDays[1]?.split("")[0]),
          getCharacterCodeFoDigit(fifthRowDays[1]?.split("")[1]),
          ...Array.from(
            { length: numberOfDaysInLastRow },
            () => calendarDayColor
          ),
          ...Array.from({ length: 22 - (5 + numberOfDaysInLastRow) }, () => 0),
        ];

  const monthYear = hideMonthYear
    ? [0, 0, 0, 0, 0]
    : [
        ...`${month + 1}`.split("").map((num) => getCharacterCodeFoDigit(num)),
        59,
        ...`${year}`
          .split("")
          .map((num) => getCharacterCodeFoDigit(num))
          .slice(2, 4),
      ];
  const headerSpace = 5 - monthYear.length;
  const calendar = [
    [
      ...monthYear,
      ...Array.from({ length: headerSpace }).map(() => 0),
      ...(hideSMTWTFS
        ? [0, 0, 0, 0, 0, 0, 0]
        : daysOfWeek.map((day) => getCharCodeForDay(day))),
      ...Array.from({ length: 22 - (7 + 5) }, () => 0),
    ],

    firstRow,
    secondRow,
    thirdRow,
    fourthRow,
    fifthRow,
  ];
  // fill in the days
  vbmlDays.forEach((vbmlDay, index) => {
    const day = parseInt(`${Object.keys(vbmlDay)[index]}`);
    const color = Object.values(vbmlDay)[index];
    const todaysRow = Math.floor((day + offset - 1) / 7) + 1;
    const modulous = (day + offset - 1) % 7;
    // account for spillover off of the board
    const todaysColumn =
      todaysRow > 5 ? (modulous === 0 ? 12 : 13) : modulous + 5;
    calendar[todaysRow > 5 ? 5 : todaysRow][todaysColumn] = color;
  });
  return calendar;
};
