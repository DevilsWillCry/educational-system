// src/components/dashboard/RecentActivities.tsx
interface Activity {
  id: string;
  type: 'assignment' | 'quiz' | 'lesson' | 'announcement';
  title: string;
  course: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'late';
  score?: number;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export default function RecentActivities({ activities }: RecentActivitiesProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment': return '📝';
      case 'quiz': return '📊';
      case 'lesson': return '📚';
      case 'announcement': return '📢';
      default: return '🔔';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'late': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="divide-y">
      {activities.map((activity) => (
        <div key={activity.id} className="py-3 first:pt-0 last:pb-0">
          <div className="flex items-start">
            <span className="text-xl mr-3">{getActivityIcon(activity.type)}</span>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{activity.title}</h4>
              <div className="max-w-full flex justify-between items-center mt-1">
                <span className="text-xs text-gray-500">{activity.course}</span>
              </div>
            </div>
            <span className={`flex items-center flex-col text-xs font-medium ${getStatusColor(activity.status)}  h-full w-[10%]`}>
              {activity.status === 'completed' && activity.score ? `${activity.score}/10` : activity.status}
              <span className="text-xs text-gray-400">
                  {activity.timestamp.toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short' 
                  })}
                </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}