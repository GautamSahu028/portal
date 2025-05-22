import { Bell } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  course: string;
}

// Mock data
const announcements: Announcement[] = [
  {
    id: "1",
    title: "Final Exam Schedule",
    content: "The final examination schedule for this semester has been published.",
    date: "2025-05-10",
    author: "John Doe",
    course: "Computer Science 101",
  },
  {
    id: "2",
    title: "Library Hours Extended",
    content: "Library hours will be extended during the final exam period.",
    date: "2025-05-08",
    author: "Jane Smith",
    course: "All Students",
  },
  {
    id: "3",
    title: "Assignment Deadline Extended",
    content: "The deadline for the research paper has been extended by one week.",
    date: "2025-05-05",
    author: "John Doe",
    course: "Advanced Programming",
  },
];

export default function RecentAnnouncements() {
  return (
    <div className="space-y-4">
      {announcements.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Bell className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No announcements yet</p>
        </div>
      ) : (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{announcement.title}</h3>
              <span className="text-xs text-muted-foreground">
                {new Date(announcement.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {announcement.content}
            </p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-primary">{announcement.course}</span>
              <span className="text-muted-foreground">by {announcement.author}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}