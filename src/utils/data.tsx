export type Note = {
  _id :string,
  notetitle:string,
  notedescription:string,
  noteDate:string,
  noteTime:string
}

export type NoteCategory = {
  _id : string,
  category : string,
  notes : Note[]
}

const data:NoteCategory[]= [
      {
        _id: "1a2b3c4d",
        category: "Notes of Work",
        notes: [
          {
            _id: "a1b2c3d4",
            notetitle: "Meeting with Client",
            notedescription: "Discuss project milestones and timelines",
            noteDate: "2024-11-18",
            noteTime: "10:00 AM"
          },
          {
            _id: "e5f6g7h8",
            notetitle: "Code Review",
            notedescription: "Review PR for feature implementation",
            noteDate: "2024-11-18",
            noteTime: "2:00 PM"
          },
          {
            _id: "i9j0k1l2",
            notetitle: "Team Standup",
            notedescription: "Daily team sync-up meeting",
            noteDate: "2024-11-19",
            noteTime: "9:30 AM"
          },
          {
            _id: "i9j0k1l2",
            notetitle: "Team Standup",
            notedescription: "Daily team sync-up meeting",
            noteDate: "2024-11-19",
            noteTime: "9:30 AM"
          },
          {
            _id: "i9j0k1l2",
            notetitle: "Team Standup",
            notedescription: "Daily team sync-up meeting",
            noteDate: "2024-11-19",
            noteTime: "9:30 AM"
          }
        ]
      },
      {
        _id: "2b3c4d5e",
        category: "Personal Notes",
        notes: [
          {
            _id: "j3k4l5m6",
            notetitle: "Grocery Shopping",
            notedescription: "Buy groceries for the week",
            noteDate: "2024-11-20",
            noteTime: "5:00 PM"
          },
          {
            _id: "n7o8p9q0",
            notetitle: "Workout",
            notedescription: "Complete daily workout routine",
            noteDate: "2024-11-21",
            noteTime: "7:00 AM"
          },
          {
            _id: "r1s2t3u4",
            notetitle: "Call Mom",
            notedescription: "Catch up with Mom over the phone",
            noteDate: "2024-11-21",
            noteTime: "8:00 PM"
          }
        ]
      },
      {
        _id: "3c4d5e6f",
        category: "Travel Notes",
        notes: [
          {
            _id: "v5w6x7y8",
            notetitle: "Book Flights",
            notedescription: "Book flights for the upcoming vacation",
            noteDate: "2024-11-22",
            noteTime: "9:00 AM"
          },
          {
            _id: "z9a0b1c2",
            notetitle: "Hotel Reservations",
            notedescription: "Confirm hotel reservations",
            noteDate: "2024-11-22",
            noteTime: "10:30 AM"
          },
          {
            _id: "d3e4f5g6",
            notetitle: "Create Itinerary",
            notedescription: "Plan activities for the trip",
            noteDate: "2024-11-23",
            noteTime: "3:00 PM"
          }
        ]
      },
      {
        _id: "4d5e6f7g",
        category: "Learning Notes",
        notes: [
          {
            _id: "h7i8j9k0",
            notetitle: "Watch Tutorials",
            notedescription: "Watch JavaScript course videos",
            noteDate: "2024-11-24",
            noteTime: "6:00 PM"
          },
          {
            _id: "l1m2n3o4",
            notetitle: "Read Article",
            notedescription: "Read blog post on React hooks",
            noteDate: "2024-11-24",
            noteTime: "11:00 AM"
          }
        ]
      },
      {
        _id: "4d5e6f7ghij",
        category: "Health Notes",
        notes: [
          {
            _id: "h7i8j9k0",
            notetitle: "Watch Tutorials",
            notedescription: "watch tutorials on fitness routine",
            noteDate: "2024-11-24",
            noteTime: "6:00 PM"
          },
          {
            _id: "l1m2n3o4",
            notetitle: "Read Article",
            notedescription: "Read blog post on Water ",
            noteDate: "2024-11-24",
            noteTime: "11:00 AM"
          }
        ]
      },
      {
        _id: "4d5e6f7g",
        category: "Learning Notes",
        notes: [
          {
            _id: "h7i8j9k0",
            notetitle: "Watch Tutorials",
            notedescription: "Watch JavaScript course videos",
            noteDate: "2024-11-24",
            noteTime: "6:00 PM"
          },
          {
            _id: "l1m2n3o4",
            notetitle: "Read Article",
            notedescription: "Read blog post on React hooks",
            noteDate: "2024-11-24",
            noteTime: "11:00 AM"
          }
        ]
      },
      {
        _id: "4d5e6f7g",
        category: "Learning Notes",
        notes: [
          {
            _id: "h7i8j9k0",
            notetitle: "Watch Tutorials",
            notedescription: "Watch JavaScript course videos",
            noteDate: "2024-11-24",
            noteTime: "6:00 PM"
          },
          {
            _id: "l1m2n3o4",
            notetitle: "Read Article",
            notedescription: "Read blog post on React hooks",
            noteDate: "2024-11-24",
            noteTime: "11:00 AM"
          }
        ]
      }
]

export default data