export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
}

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'slot-1',
    label: 'First Period (5:45pm - 6:45pm)',
    startTime: '17:45',
    endTime: '18:45',
  },
  {
    id: 'slot-2',
    label: 'Second Period (6:45pm - 7:45pm)',
    startTime: '18:45',
    endTime: '19:45',
  },
  {
    id: 'slot-3',
    label: 'Third Period (7:45pm - 8:45pm)',
    startTime: '19:45',
    endTime: '20:45',
  },
];

export function isValidStartTime(time: string): boolean {
  return TIME_SLOTS.some((slot) => slot.startTime === time);
}

export function isValidEndTime(time: string): boolean {
  return TIME_SLOTS.some((slot) => slot.endTime === time);
}

export function findTimeSlotByStartTime(
  startTime: string,
): TimeSlot | undefined {
  return TIME_SLOTS.find((slot) => slot.startTime === startTime);
}

export function getAvailableStartTimes(): string[] {
  return TIME_SLOTS.map((slot) => slot.startTime);
}

export function getAvailableEndTimes(): string[] {
  return TIME_SLOTS.map((slot) => slot.endTime);
}
