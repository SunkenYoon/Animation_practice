"use client";

import * as ScrollArea from "@radix-ui/react-scroll-area";
import styles from "./PageSection.module.css";
import { Editor } from "../../editor/_components/Editor";
import { useState, useEffect, useCallback, useRef } from "react";
import { Note } from "../../editor/_types/editorType";
import StarterKit from "@tiptap/starter-kit";
import { generateHTML } from "@tiptap/react";
import { getActiveHeaderIndex } from "../../editor/_utils/parse_editor";
import { parseHeaders } from "../../editor/_utils/parse_editor";
import { usePageSection } from "../../_common/PageSectionProvider";

export const PageSection = () => {
  const [notes, setNotes] = useState<Note | null>(null);
  const { setHeaderList, setScrollRef } = usePageSection();

  const localScrollRef = useRef<HTMLDivElement>(null);

  const extensions = [
    StarterKit.configure({
      heading: {
        levels: [2],
      },
    }),
  ];

  const getNotes = async () => {
    const response = await fetch("/api/notes");
    const data = await response.json();
    setNotes(data.rows[0]);
  };

  const updateHeaderList = useCallback(
    (editor: any) => {
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
    [setHeaderList]
  );

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    setScrollRef(localScrollRef);
  }, [setScrollRef]);

  return (
    <ScrollArea.Root className={styles.wrapper} type="always">
      <ScrollArea.Viewport className={styles.viewport} ref={localScrollRef}>
        {notes && (
          <Editor
            extensions={extensions}
            initialContent={generateHTML(
              {
                type: notes?.type || "",
                content: notes?.content || [],
              },
              extensions
            )}
            handleUpdate={updateHeaderList}
            handleCreate={updateHeaderList}
            handleSelectionUpdate={updateHeaderList}
          />
        )}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical" className={styles.scrollbar}>
        <ScrollArea.Thumb className={styles.thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
