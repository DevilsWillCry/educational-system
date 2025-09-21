// src/components/dashboard/UpcomingClasses.tsx
interface Class {
  id: string;
  courseId: string;
  title: string;
  time: string;
  course: string;
  room: string;
  instructor: string;
}

interface UpcomingClassesProps {
  classes: Class[];
}

export default function UpcomingClasses({ classes }: UpcomingClassesProps) {
  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div key={classItem.id} className="flex p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold mr-3">
            {classItem.course.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-sm">{classItem.title}</h4>
            <p className="text-xs text-gray-600">{classItem.time}</p>
            <p className="text-xs text-gray-500">{classItem.room}</p>
          </div>
        </div>
      ))}
    </div>
  );
}