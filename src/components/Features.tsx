import { Clock, Timer, AlarmClock, StickyNote, ListTodo, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Clock",
    description: "Keep track of time across different time zones",
  },
  {
    icon: AlarmClock,
    title: "Stopwatch",
    description: "Measure elapsed time for your tasks with precision",
  },
  {
    icon: Timer,
    title: "Countdown",
    description: "Set timers for focused work sessions",
  },
  {
    icon: StickyNote,
    title: "Sticky Notes",
    description: "Quick notes and reminders at your fingertips",
  },
  {
    icon: ListTodo,
    title: "Todo Lists",
    description: "Organize and track your tasks efficiently",
  },
  {
    icon: Lightbulb,
    title: "AI Task Breakdown",
    description: "Automatically break down complex tasks into manageable steps",
  },
];

export default function Features() {
  return (
    <div className="py-20 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">All the tools you need</h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to stay productive, in one place
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border"
            >
              <div className="flex items-center gap-4">
                <feature.icon className="h-6 w-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}