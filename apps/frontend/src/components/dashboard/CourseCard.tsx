// src/components/dashboard/CourseCard.tsx
interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  color: string;
  nextLesson?: string;
  totalLessons: number;
  completedLessons: number;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-white"
          style={{ backgroundColor: course.color }}
        >
          {course.title.charAt(0)}
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Progreso</div>
          <div className="font-semibold">{course.progress}%</div>
        </div>
      </div>
      
      <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
      <p className="text-gray-600 text-sm mb-4">Prof: {course.instructor}</p>
      
      <div className="flex justify-between text-sm mb-3">
        <span className="text-gray-500">
          Lecciones: {course.completedLessons}/{course.totalLessons}
        </span>
        {course.nextLesson && (
          <span className="text-blue-600 font-medium">
            {course.nextLesson}
          </span>
        )}
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all"
          style={{ 
            width: `${course.progress}%`, 
            backgroundColor: course.color 
          }}
        />
      </div>
    </div>
  );
}