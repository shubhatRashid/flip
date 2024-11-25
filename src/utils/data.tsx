export type Note = {
  _id: string;
  notetitle: string;
  notedescription: string;
  noteDate: string;
  noteTime: string;
  backgroundColor: string; // Renamed color to backgroundColor
  textColor: string;       // Added textColor
};

export type NoteCategory = {
  _id: string;
  category: string;
  notes: Note[];
};

// Updated data with backgroundColor and textColor for better readability
export const data: NoteCategory[] = [
  {
    _id: "1a2b3c4d5e6f7a8b9c0d1e2f", // 24-character hex ID
    category: "Notes of Work",
    notes: [
      {
        _id: "a1b2c3d4e5f6g7h8i9j0k1l2",
        notetitle: "Meeting with Client",
        notedescription: "Discuss project milestones and timelines",
        noteDate: "2024-11-18",
        noteTime: "10:00 AM",
        backgroundColor: "#ADD8E6", // Light blue
        textColor: "#000000"        // Black for good contrast
      },
      {
        _id: "e5f6g7h8i9j0k1l2m3n4o5p6",
        notetitle: "Code Review",
        notedescription: "Review PR for feature implementation",
        noteDate: "2024-11-18",
        noteTime: "2:00 PM",
        backgroundColor: "#E6E6FA", // Lavender
        textColor: "#4B0082"        // Dark indigo for contrast
      },
      {
        _id: "i9j0k1l2m3n4o5p6q7r8s9t0",
        notetitle: "Team Standup",
        notedescription: "Daily team sync-up meeting",
        noteDate: "2024-11-19",
        noteTime: "9:30 AM",
        backgroundColor: "#F0E68C", // Light khaki
        textColor: "#8B4513"        // Saddle brown for contrast
      }
    ]
  },
  {
    _id: "2b3c4d5e6f7g8h9i0j1k2l3m", // 24-character hex ID
    category: "Personal Notes",
    notes: [
      {
        _id: "j3k4l5m6n7o8p9q0r1s2t3u4",
        notetitle: "Grocery Shopping",
        notedescription: "Buy groceries for the week",
        noteDate: "2024-11-20",
        noteTime: "5:00 PM",
        backgroundColor: "#FFE4B5", // Moccasin
        textColor: "#8B4513"        // Saddle brown for contrast
      },
      {
        _id: "n7o8p9q0r1s2t3u4v5w6x7y8",
        notetitle: "Workout",
        notedescription: "Complete daily workout routine",
        noteDate: "2024-11-21",
        noteTime: "7:00 AM",
        backgroundColor: "#AFEEEE", // Pale turquoise
        textColor: "#00688B"        // Dark turquoise for contrast
      },
      {
        _id: "r1s2t3u4v5w6x7y8z9a0b1c2",
        notetitle: "Call Mom",
        notedescription: "Catch up with Mom over the phone",
        noteDate: "2024-11-21",
        noteTime: "8:00 PM",
        backgroundColor: "#D3D3D3", // Light gray
        textColor: "#000000"        // Black for contrast
      }
    ]
  },
  {
    _id: "3c4d5e6f7g8h9i0j1k2l3m4n", // 24-character hex ID
    category: "Travel Notes",
    notes: [
      {
        _id: "v5w6x7y8z9a0b1c2d3e4f5g6",
        notetitle: "Book Flights",
        notedescription: "Book flights for the upcoming vacation",
        noteDate: "2024-11-22",
        noteTime: "9:00 AM",
        backgroundColor: "#F5F5DC", // Beige
        textColor: "#8B4513"        // Saddle brown for contrast
      },
      {
        _id: "z9a0b1c2d3e4f5g6h7i8j9k0",
        notetitle: "Hotel Reservations",
        notedescription: "Confirm hotel reservations",
        noteDate: "2024-11-22",
        noteTime: "10:30 AM",
        backgroundColor: "#F0FFF0", // Honeydew
        textColor: "#006400"        // Dark green for contrast
      },
      {
        _id: "d3e4f5g6h7i8j9k0l1m2n3o4",
        notetitle: "Create Itinerary",
        notedescription: "Plan activities for the trip",
        noteDate: "2024-11-23",
        noteTime: "3:00 PM",
        backgroundColor: "#FFFACD", // Lemon chiffon
        textColor: "#8B0000"        // Dark red for contrast
      }
    ]
  },
  {
    _id: "4d5e6f7g8h9i0j1k2l3m4n5o", // 24-character hex ID
    category: "Learning Notes",
    notes: [
      {
        _id: "h7i8j9k0l1m2n3o4p5q6r7s8",
        notetitle: "Watch Tutorials",
        notedescription: "Watch JavaScript course videos",
        noteDate: "2024-11-24",
        noteTime: "6:00 PM",
        backgroundColor: "#E0FFFF", // Light cyan
        textColor: "#00008B"        // Dark blue for contrast
      },
      {
        _id: "l1m2n3o4p5q6r7s8t9u0v1w2",
        notetitle: "Read Article",
        notedescription: "Read blog post on React hooks",
        noteDate: "2024-11-24",
        noteTime: "11:00 AM",
        backgroundColor: "#FFF8DC", // Cornsilk
        textColor: "#8B4513"        // Saddle brown for contrast
      }
    ]
  }
];

export default data;
