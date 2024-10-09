let data = [
  {
    category: "work",
    tasks: [
      { id: 1, task: "Complete React project", completed: false },
      { id: 2, task: "Prepare presentation for meeting", completed: true },
      { id: 3, task: "Complete React project", completed: false },
      { id: 4, task: "Prepare presentation for meeting", completed: true }
    ],
    lastId: 4 // The last task ID for work category
  },
  {
    category: "personal",
    tasks: [
      { id: 5, task: "Buy groceries", completed: false }
    ],
    lastId: 5 // The last task ID for personal category
  },
  {
    category: "fitness",
    tasks: [
      { id: 6, task: "Go for a run", completed: true }
    ],
    lastId: 6 // The last task ID for fitness category
  },
  {
    category: "leisure",
    tasks: [
      { id: 7, task: "Read a book", completed: false }
    ],
    lastId: 7 // The last task ID for leisure category
  },
];


  export default data