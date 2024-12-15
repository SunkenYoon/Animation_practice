import { JSONContent } from "@tiptap/react";

export type Note = {
  id: number;
  title: string;
  type: string;
  content: JSONContent[];
};
