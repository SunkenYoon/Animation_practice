import { Editor } from "@tiptap/react";

export const parseHeaders = (editor: Editor) => {
  const contentList = editor.getJSON().content;
  const headers =
    contentList?.filter((content) => content.type === "heading") ?? [];

  console.log(headers);
  return headers
    .map((header) => header.content?.map((content) => content.text ?? "") ?? "")
    .flat();
};

export const getActiveHeaderIndex = (editor: Editor) => {
  const headers = parseHeaders(editor);

  const selection = editor.state.selection;

  //TODO: 헤더 텍스트가 같을 때에 대한 처리
  const activeHeaderIndex = headers.findIndex((_, index) => {
    const headerNode = editor.state.doc.nodeAt(
      editor.state.doc.resolve(selection.$head.pos).before()
    );
    return (
      headerNode?.type.name === "heading" &&
      headerNode?.textContent === headers[index]
    );
  });

  //헤더 영역이 아닐 경우, 윗 방향으로 가장 가까운 헤더를 지정한다.
  if (activeHeaderIndex === -1) {
    const currentPos = selection.$head.pos;
    let nearestHeaderIndex = -1;

    for (let pos = currentPos; pos >= 0; pos--) {
      const node = editor.state.doc.nodeAt(pos);

      if (node?.type.name === "heading") {
        nearestHeaderIndex = headers.findIndex(
          (header) => header === node.textContent
        );
        break;
      }
    }
    return nearestHeaderIndex;
  }

  return activeHeaderIndex;
};
