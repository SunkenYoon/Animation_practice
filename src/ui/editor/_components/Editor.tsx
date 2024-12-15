"use client";

import { EditorContent } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { getActiveHeaderIndex, parseHeaders } from "../_utils/parse_editor";
import { usePageSection } from "../../_common/PageSectionProvider";

export const Editor = () => {
  const { setHeaderList } = usePageSection();

  const extensions = [
    StarterKit.configure({
      heading: {
        levels: [2],
      },
    }),
  ];
  const content =
    "<h2>아무거나 입력해볼까요?</h2><p>ㅇㅇㅇ</p><h2>진짜 아무거나 입력해보세요!</h2>";

  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const headers = parseHeaders(editor);
      const activeHeaderIndex = getActiveHeaderIndex(editor);
      setHeaderList(
        headers.map((header, index) => ({
          text: header,
          level: 2,
          isActive: index === activeHeaderIndex,
        }))
      );
    },
    onCreate: ({ editor }) => {
      const headers = parseHeaders(editor);
      const activeHeaderIndex = getActiveHeaderIndex(editor);
      setHeaderList(
        headers.map((header, index) => ({
          text: header,
          level: 2,
          isActive: index === activeHeaderIndex,
        }))
      );
    },
    onSelectionUpdate: ({ editor }) => {
      const headers = parseHeaders(editor);
      const activeHeaderIndex = getActiveHeaderIndex(editor);
      setHeaderList(
        headers.map((header, index) => ({
          text: header,
          level: 2,
          isActive: index === activeHeaderIndex,
        }))
      );
    },
  });

  return (
    <EditorContent
      editor={editor}
      style={{
        outline: "none",
      }}
    />
  );
};
