import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const TextEditor = ({ fileId }) => {
  const notes = useQuery(api.notes.GetNotes, { fileId });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "focus:outline-none p-6 min-h-screen bg-[#1b1b1c] text-white prose prose-invert max-w-none caret-white placeholder:text-gray-400",
      },
    },
  });

  useEffect(() => {
    if (editor && notes) {
      editor.commands.setContent(notes);
    }
  }, [notes, editor]);

  return (
    <div className="bg-[#141415] text-white overflow-y-auto h-[90vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      <EditorExtension editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
