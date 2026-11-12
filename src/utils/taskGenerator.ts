import type { Task } from "../types/task";

const titles = [
  "Authentication Module",
  "Dashboard UI",
  "Payment Integration",
  "Notification Service",
  "Database Migration",
  "Profile Page",
  "Analytics Module",
  "Landing Page"
];

const users = [
  "Alex",
  "Sarah",
  "Emma",
  "John",
  "Mike",
  "David"
];

const priorities = [
  "Critical",
  "High",
  "Medium",
  "Low"
] as const;

const statuses = [
  "Todo",
  "In Progress",
  "Review",
  "Done"
] as const;

export const generateTasks = (
  count: number
): Task[] => {
  return Array.from(
    { length: count },
    (_, index) => {
      const start = new Date();

      start.setDate(
        start.getDate() -
          Math.floor(Math.random() * 20)
      );

      const due = new Date(start);

      due.setDate(
        due.getDate() +
          Math.floor(Math.random() * 15)
      );

      return {
        id: `task-${index}`,
        title:
          titles[
            Math.floor(
              Math.random() *
                titles.length
            )
          ] +
          " #" +
          index,

        description:
          "Generated task description",

        assignee:
          users[
            Math.floor(
              Math.random() *
                users.length
            )
          ],

        priority:
          priorities[
            Math.floor(
              Math.random() *
                priorities.length
            )
          ],

        status:
          statuses[
            Math.floor(
              Math.random() *
                statuses.length
            )
          ],

        startDate:
          start.toISOString(),

        dueDate:
          due.toISOString(),

        createdAt:
          new Date().toISOString()
      };
    }
  );
};