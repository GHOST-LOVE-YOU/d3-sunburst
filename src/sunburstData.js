const sunburstData = {
  name: "KineParse Bench",
  children: [
    {
      name: "KineParse-Cap",
      children: [
        {
          name: "Instrument",
          children: [
            { name: "playing violin", value: 1 },
            { name: "...", value: 1 },
            { name: "playing drums", value: 1 },
          ],
        },
        {
          name: "Sports",
          children: [
            { name: "run", value: 1 },
            { name: "...", value: 1 },
            { name: "swim", value: 1 },
          ],
        },
        {
          name: "Device",
          children: [
            { name: "write", value: 1 },
            { name: "...", value: 1 },
            { name: "phoning", value: 1 },
          ],
        },
        {
          name: "limb",
          children: [
            { name: "kneel", value: 1 },
            { name: "...", value: 1 },
            { name: "squat", value: 1 },
          ],
        },
        {
          name: "Exercise",
          children: [
            { name: "crunch", value: 1 },
            { name: "...", value: 1 },
            { name: "pilates", value: 1 },
          ],
        },
        {
          name: "...",
          children: [{ name: "...", value: 2 }],
        },
      ],
    },
    {
      name: "KineParse-QA",
      children: [
        {
          name: "Human",
          children: [
            { name: "People counting", value: 1 },
            { name: "....", value: 1 },
            { name: "People interaction", value: 1 },
          ],
        },
        {
          name: "Movement",
          children: [
            { name: "Type of movement", value: 1 },
            { name: "Speed or pace", value: 1 },
            { name: "Rhythm or pattern", value: 1 },
            { name: ".....", value: 1 },
            { name: "Temporal order of movements", value: 1 },
            { name: "Object manipulation", value: 1 },
          ],
        },
        {
          name: "Camera",
          children: [
            { name: "Camera movement", value: 1 },
            { name: "......", value: 1 },
            { name: "Zoom/focus adjustment", value: 1 },
          ],
        },
        {
          name: "Emotion",
          children: [
            { name: "Emotions conveyed", value: 1 },
            { name: "Facial expressions", value: 1 },
          ],
        },
        {
          name: "Env",
          children: [
            { name: "Indoors/outdoors", value: 1 },
            { name: "Environmental influence", value: 1 },
          ],
        },
      ],
    },
    {
      name: "KineParse-Hall",
      children: [
        {
          name: "Motion",
          children: [
            { name: "Walking", value: 1 },
            { name: "Running", value: 1 },
            { name: "Fitness", value: 1 },
            { name: "Skateboarding", value: 1 },
            { name: "Tennis", value: 1 },
            { name: "Dancing", value: 1 },
            { name: "Football", value: 1 },
            { name: "Figure Skating", value: 1 },
          ],
        },
        {
          name: "Speed",
          children: [
            { name: "Fast", value: 1 },
            { name: "Moderate", value: 1 },
            { name: "Slow", value: 1 },
          ],
        },
      ],
    },
  ],
};

export default sunburstData;
