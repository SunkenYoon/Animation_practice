const placeholderNotes = [
  {
    id: 1,
    type: "doc",
    title: "노트 1",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "아무거나 입력해볼까요?" }],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "ㅇㅇㅇ" }],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "진짜 아무거나 입력해보세요!" }],
      },
    ],
  },
  {
    id: 2,
    type: "doc",
    title: "노트 2",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "아무거나 입력해볼까요?" }],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "ㅇㅇㅇ" }],
      },
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "진짜 아무거나 입력해보세요!" }],
      },
    ],
  },
];

module.exports = { placeholderNotes };
