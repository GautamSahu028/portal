import { Calendar, Clock } from "lucide-react";

interface ClassEvent {
  id: string;
  course: string;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

// Mock data
const upcomingClasses: ClassEvent[] = [
  {
    id: "1",
    course: "CS101: Intro to Programming",
    day: "Monday",
    startTime: "10:00",
    endTime: "11:30",
    location: "Hall A-101",
  },
  {
    id: "2",
    course: "CS201: Data Structures",
    day: "Monday",
    startTime: "13:00",
    endTime: "14:30",
    location: "Lab B-202",
  },
  {
    id: "3",
    course: "CS301: Algorithms",
    day: "Tuesday",
    startTime: "09:00",
    endTime: "10:30",
    location: "Hall A-101",
  },
  {
    id: "4",
    course: "CS401: Database Systems",
    day: "Wednesday",
    startTime: "14:00",
    endTime: "15:30",
    location: "Lab B-203",
  },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", 
  "13:00", "14:00", "15:00", "16:00"
];

// Helper to get current or next day of the week
const getCurrentOrNextDay = (dayName: string) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const now = new Date();
  const today = days[now.getDay()];
  
  if (today === dayName) {
    return "Today";
  }
  
  const dayIndex = days.indexOf(dayName);
  const todayIndex = days.indexOf(today);
  
  if (dayIndex > todayIndex) {
    return "In " + (dayIndex - todayIndex) + " days";
  } else {
    return "In " + (7 - todayIndex + dayIndex) + " days";
  }
};

interface ClassScheduleProps {
  extended?: boolean;
}

export default function ClassSchedule({ extended = false }: ClassScheduleProps) {
  if (!extended) {
    return (
      <div className="space-y-3">
        {upcomingClasses.slice(0, 3).map((classEvent) => (
          <div
            key={classEvent.id}
            className="flex items-start space-x-3 border rounded-lg p-3 hover:bg-accent/50 transition-colors"
          >
            <div className="mt-0.5">
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium line-clamp-1">{classEvent.course}</h3>
              <div className="text-sm text-muted-foreground mt-1">
                <div className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>
                    {classEvent.startTime} - {classEvent.endTime} ({getCurrentOrNextDay(classEvent.day)})
                  </span>
                </div>
                <div className="mt-1">{classEvent.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 border"></th>
            {days.map((day) => (
              <th key={day} className="text-left p-2 border">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td className="border p-2 text-sm">{time}</td>
              {days.map((day) => {
                const classEvent = upcomingClasses.find(
                  (c) => c.day === day && c.startTime === time
                );
                
                return (
                  <td key={`${day}-${time}`} className="border p-2">
                    {classEvent && (
                      <div className="bg-primary/10 rounded p-1 text-xs">
                        <div className="font-medium">{classEvent.course}</div>
                        <div className="text-muted-foreground mt-1">{classEvent.location}</div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}