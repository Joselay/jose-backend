import { TimeSlotEnum } from '@prisma/client';

export interface TimeSlot {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  period: TimeSlotEnum;
}

export const TIME_SLOTS: TimeSlot[] = [
  {
    id: 'slot-1',
    label: 'First Period (5:45pm - 6:45pm)',
    startTime: '5:45',
    endTime: '6:45',
    period: TimeSlotEnum.FIRST_PERIOD,
  },
  {
    id: 'slot-2',
    label: 'Second Period (6:45pm - 7:45pm)',
    startTime: '6:45',
    endTime: '7:45',
    period: TimeSlotEnum.SECOND_PERIOD,
  },
  {
    id: 'slot-3',
    label: 'Third Period (7:45pm - 8:45pm)',
    startTime: '7:45',
    endTime: '8:45',
    period: TimeSlotEnum.THIRD_PERIOD,
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

export function findTimeSlotByPeriod(
  period: TimeSlotEnum,
): TimeSlot | undefined {
  return TIME_SLOTS.find((slot) => slot.period === period);
}

export function getAvailableStartTimes(): string[] {
  return TIME_SLOTS.map((slot) => slot.startTime);
}

export function getAvailableEndTimes(): string[] {
  return TIME_SLOTS.map((slot) => slot.endTime);
}

export function mapTimeToPeriod(startTime: string): TimeSlotEnum {
  switch (startTime) {
    case '5:45':
      return TimeSlotEnum.FIRST_PERIOD;
    case '6:45':
      return TimeSlotEnum.SECOND_PERIOD;
    case '7:45':
      return TimeSlotEnum.THIRD_PERIOD;
    default:
      console.warn(
        `Unknown start time: ${startTime}, defaulting to FIRST_PERIOD`,
      );
      return TimeSlotEnum.FIRST_PERIOD;
  }
}
