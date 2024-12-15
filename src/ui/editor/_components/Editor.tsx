"use client";

import { EditorContent } from "@tiptap/react";
import { useEditor } from "@tiptap/react";

type EditorProps = {
  extensions: any;
  initialContent: any;
  handleUpdate: (editor: any) => void;
  handleCreate: (editor: any) => void;
  handleSelectionUpdate: (editor: any) => void;
};

export const Editor = ({
  extensions,
  initialContent,
  handleUpdate,
  handleCreate,
  handleSelectionUpdate,
}: EditorProps) => {
  const editor = useEditor({
    extensions,
    content: initialContent,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      handleUpdate(editor);
    },
    onCreate: ({ editor }) => {
      handleCreate(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      handleSelectionUpdate(editor);
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
