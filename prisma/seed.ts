import { Day, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TimeSlotType = 'FIRST_PERIOD' | 'SECOND_PERIOD' | 'THIRD_PERIOD';

interface Teacher {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Room {
  id: string;
  number: string;
  building: string | null;
  capacity: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Subject {
  id: string;
  code: string;
  name: string;
  description: string | null;
  creditHours: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  period: TimeSlotType;
  createdAt: Date;
  updatedAt: Date;
}

async function main() {
  await prisma.schedule.deleteMany();
  try {
    await prisma.$executeRaw`TRUNCATE TABLE "time_slots" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "subjects" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "rooms" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "teachers" CASCADE;`;
  } catch (e) {
    console.log('Tables do not exist yet, continuing with schema creation');
  }

  console.log('Seeding database...');

  const teachersData = [
    { name: 'KRIS' },
    { name: 'LIM' },
    { name: 'DS' },
    { name: 'SEM' },
    { name: 'CS' },
    { name: 'SYDETH' },
    { name: 'PHILIPPE' },
    { name: 'PISETH' },
    { name: 'SUM' },
  ];

  const teachers: Teacher[] = [];
  for (const data of teachersData) {
    const teacher = await prisma.teacher.create({ data });
    teachers.push(teacher as Teacher);
    console.log(`Created teacher: ${teacher.name}`);
  }

  const roomsData = [
    { number: '1G' },
    { number: '2B' },
    { number: '2L' },
    { number: '3J' },
    { number: '3D' },
    { number: '1B' },
    { number: '1E' },
    { number: '2J' },
    { number: '2C' },
    { number: '2I' },
    { number: '3I' },
  ];

  const rooms: Room[] = [];
  for (const data of roomsData) {
    const room = await prisma.room.create({ data });
    rooms.push(room as Room);
    console.log(`Created room: ${room.number}`);
  }

  const subjectsData = [
    { code: 'E+L', name: 'Electronics and Lab' },
    { code: 'CND II', name: 'Computer Networks and Distributions II' },
    { code: 'CA II', name: 'Computer Algorithms II' },
    { code: 'E COM', name: 'E-Commerce' },
    { code: 'ADV PP', name: 'Advanced Probabilistic Programming' },
    { code: 'J IREP', name: 'Java Integration and REP' },
    { code: 'ENG 7', name: 'English 7' },
    { code: 'LIN II', name: 'Linear Algebra II' },
    { code: 'M A', name: 'Mobile Applications' },
  ];

  const subjects: Subject[] = [];
  for (const data of subjectsData) {
    const subject = await prisma.subject.create({ data });
    subjects.push(subject as Subject);
    console.log(`Created subject: ${subject.code} - ${subject.name}`);
  }

  const timeSlotsData = [
    {
      startTime: '5:45',
      endTime: '6:45',
      period: 'FIRST_PERIOD' as TimeSlotType,
    },
    {
      startTime: '6:45',
      endTime: '7:45',
      period: 'SECOND_PERIOD' as TimeSlotType,
    },
    {
      startTime: '7:45',
      endTime: '8:45',
      period: 'THIRD_PERIOD' as TimeSlotType,
    },
  ];

  const timeSlots: TimeSlot[] = [];
  for (const data of timeSlotsData) {
    const timeSlot = await prisma.timeSlot.create({ data });
    timeSlots.push(timeSlot as TimeSlot);
    console.log(
      `Created time slot: ${timeSlot.startTime} - ${timeSlot.endTime} (${timeSlot.period})`,
    );
  }

  const findTeacher = (name: string): Teacher => {
    const teacher = teachers.find((t) => t.name === name);
    if (!teacher) {
      throw new Error(`Teacher not found: ${name}`);
    }
    return teacher;
  };

  const findRoom = (number: string): Room => {
    const room = rooms.find((r) => r.number === number);
    if (!room) {
      throw new Error(`Room not found: ${number}`);
    }
    return room;
  };

  const findSubject = (code: string): Subject => {
    const subject = subjects.find((s) => s.code === code);
    if (!subject) {
      throw new Error(`Subject not found: ${code}`);
    }
    return subject;
  };

  const getTimeSlot = (startTime: string, endTime: string): TimeSlot => {
    const timeSlot = timeSlots.find(
      (ts) => ts.startTime === startTime && ts.endTime === endTime,
    );
    if (!timeSlot) {
      throw new Error(`Time slot not found: ${startTime} - ${endTime}`);
    }
    return timeSlot;
  };

  const scheduleItems = [
    {
      teacherId: findTeacher('SEM').id,
      roomId: findRoom('2C').id,
      timeSlotId: getTimeSlot('5:45', '6:45').id,
      day: Day.MONDAY,
      subjectId: findSubject('E+L').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('LIM').id,
      roomId: findRoom('2L').id,
      timeSlotId: getTimeSlot('6:45', '7:45').id,
      day: Day.MONDAY,
      subjectId: findSubject('J IREP').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('PHILIPPE').id,
      roomId: findRoom('2J').id,
      timeSlotId: getTimeSlot('7:45', '8:45').id,
      day: Day.MONDAY,
      subjectId: findSubject('ADV PP').id,
      semester: '1',
      year: '4',
    },

    {
      teacherId: findTeacher('SYDETH').id,
      roomId: findRoom('2I').id,
      timeSlotId: getTimeSlot('5:45', '6:45').id,
      day: Day.TUESDAY,
      subjectId: findSubject('CND II').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('LIM').id,
      roomId: findRoom('2B').id,
      timeSlotId: getTimeSlot('6:45', '7:45').id,
      day: Day.TUESDAY,
      subjectId: findSubject('J IREP').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('KRIS').id,
      roomId: findRoom('2B').id,
      timeSlotId: getTimeSlot('7:45', '8:45').id,
      day: Day.TUESDAY,
      subjectId: findSubject('LIN II').id,
      semester: '1',
      year: '4',
    },

    {
      teacherId: findTeacher('PISETH').id,
      roomId: findRoom('2L').id,
      timeSlotId: getTimeSlot('5:45', '6:45').id,
      day: Day.WEDNESDAY,
      subjectId: findSubject('CA II').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('DS').id,
      roomId: findRoom('3J').id,
      timeSlotId: getTimeSlot('6:45', '7:45').id,
      day: Day.WEDNESDAY,
      subjectId: findSubject('ENG 7').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('SUM').id,
      roomId: findRoom('3J').id,
      timeSlotId: getTimeSlot('7:45', '8:45').id,
      day: Day.WEDNESDAY,
      subjectId: findSubject('M A').id,
      semester: '1',
      year: '4',
    },

    {
      teacherId: findTeacher('CS').id,
      roomId: findRoom('2B').id,
      timeSlotId: getTimeSlot('5:45', '6:45').id,
      day: Day.THURSDAY,
      subjectId: findSubject('E COM').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('PISETH').id,
      roomId: findRoom('2B').id,
      timeSlotId: getTimeSlot('6:45', '7:45').id,
      day: Day.THURSDAY,
      subjectId: findSubject('CA II').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('SUM').id,
      roomId: findRoom('1B').id,
      timeSlotId: getTimeSlot('7:45', '8:45').id,
      day: Day.THURSDAY,
      subjectId: findSubject('M A').id,
      semester: '1',
      year: '4',
    },

    {
      teacherId: findTeacher('PHILIPPE').id,
      roomId: findRoom('1B').id,
      timeSlotId: getTimeSlot('5:45', '6:45').id,
      day: Day.FRIDAY,
      subjectId: findSubject('ADV PP').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('SEM').id,
      roomId: findRoom('3D').id,
      timeSlotId: getTimeSlot('6:45', '7:45').id,
      day: Day.FRIDAY,
      subjectId: findSubject('E+L').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('DS').id,
      roomId: findRoom('3D').id,
      timeSlotId: getTimeSlot('7:45', '8:45').id,
      day: Day.FRIDAY,
      subjectId: findSubject('ENG 7').id,
      semester: '1',
      year: '4',
    },

    {
      teacherId: findTeacher('CS').id,
      roomId: findRoom('1E').id,
      timeSlotId: getTimeSlot('5:45', '6:45').id,
      day: Day.SATURDAY,
      subjectId: findSubject('E COM').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('KRIS').id,
      roomId: findRoom('1G').id,
      timeSlotId: getTimeSlot('6:45', '7:45').id,
      day: Day.SATURDAY,
      subjectId: findSubject('LIN II').id,
      semester: '1',
      year: '4',
    },
    {
      teacherId: findTeacher('SYDETH').id,
      roomId: findRoom('3I').id,
      timeSlotId: getTimeSlot('7:45', '8:45').id,
      day: Day.SATURDAY,
      subjectId: findSubject('CND II').id,
      semester: '1',
      year: '4',
    },
  ];

  for (const data of scheduleItems) {
    try {
      const schedule = await prisma.schedule.create({
        data,
      });
      console.log(`Created schedule with ID: ${schedule.id}`);
    } catch (error) {
      console.error(`Failed to create schedule: ${error.message}`);
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
