import { Editor } from "@tiptap/react";

export const parseHeaders = (editor: Editor) => {
  const contentList = editor.getJSON().content;
  const headers =
    contentList?.filter((content) => content.type === "heading") ?? [];

  return headers
    .map((header) => header.content?.map((content) => content.text ?? "") ?? "")
    .flat();
};

export const getActiveHeaderIndex = (editor: Editor) => {
  const headers = parseHeaders(editor);

  const selection = editor.state.selection;
  const currentPos = selection.$head.pos;

  let nearestHeaderIndex = -1;

  for (let pos = currentPos; pos >= 0; pos--) {
    const node = editor.state.doc.nodeAt(pos);

    //TODO: 같은 텍스트에 대한 처리
    if (node?.type.name === "heading") {
      nearestHeaderIndex = headers.findIndex(
        (header) => header === node.textContent
      );
      break;
    }
  }
  return nearestHeaderIndex;
};
