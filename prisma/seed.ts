import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.schedule.deleteMany();

  const scheduleItems = [
    {
      teacherName: 'Heng Phillipe',
      room: '3A',
      startTime: '17:45',
      endTime: '18:45',
      day: 'monday',
      subject: 'Mathematics',
    },
    {
      teacherName: 'Sarah Johnson',
      room: '2B',
      startTime: '18:45',
      endTime: '19:45',
      day: 'tuesday',
      subject: 'English',
    },
    {
      teacherName: 'David Lee',
      room: '4C',
      startTime: '19:45',
      endTime: '20:45',
      day: 'wednesday',
      subject: 'Science',
    },
    {
      teacherName: 'Maria Garcia',
      room: '1A',
      startTime: '17:45',
      endTime: '18:45',
      day: 'thursday',
      subject: 'History',
    },
    {
      teacherName: 'James Wilson',
      room: '5D',
      startTime: '18:45',
      endTime: '19:45',
      day: 'friday',
      subject: 'Physics',
    },
    {
      teacherName: 'Emma Brown',
      room: '3B',
      startTime: '19:45',
      endTime: '20:45',
      day: 'saturday',
      subject: 'Chemistry',
    },
  ];

  console.log('Seeding database...');

  for (const data of scheduleItems) {
    const schedule = await prisma.schedule.create({
      data,
    });
    console.log(`Created schedule with ID: ${schedule.id}`);
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
