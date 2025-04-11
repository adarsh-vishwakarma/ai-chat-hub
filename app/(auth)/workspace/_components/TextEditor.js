import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align'
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const TextEditor = ({fileId}) => {
  const notes = useQuery(api.notes.GetNotes, {
    fileId:fileId
  })
  console.log(notes)
  const editor = useEditor({
    extensions: [
      StarterKit,

      TextAlign.configure({
        alignments: ['left', 'right', 'heading', 'paragraph'],
      }),
      
      Placeholder.configure({
        // Use a placeholder:
        placeholder: "Write something …",
      }),
    ],

    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });

  useEffect(()=>{
    editor&&editor.commands.setContent(notes)
  },[notes&&editor])
 
  return (
    <div>
      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[80vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
