import { chatSession } from "@/config/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Italic,
  Sparkles,
} from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const EditorExtension = ({ editor }) => {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes)
  const {user} = useUser();
  const onAiClick = async () => {
    toast("AI is working..")
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("seleced", selectedText);
    const result = await SearchAI({
      query: selectedText,
      fileId: fileId,
    });
    const UnformattedAns = JSON.parse(result);
    const answer = UnformattedAns.map((item) => item.pageContent).join("\n\n");

    console.log("Answer", answer);
    const PROMPT = `{
        "role": "system",
        "content": "Use the following pieces of context (or previous conversation if needed) to answer the user's question in markdown format."
      },
      {
        "role": "user",
        "content": "For question: " + ${selectedText} + " and with the given content as answer, please give an appropriate answer in text format. The answer content is " + ${answer} + ". \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.\n----------------\n"
      }`;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    //   console.log(AiModelResult.response.text());
    const FinalAns = AiModelResult.response.text();
    const AllText = editor.getHTML();
    editor.commands.setContent(
        AllText + "<p> <strong>Answer: </strong> " + FinalAns + "</p>"
    );
    saveNotes({
      notes:editor.getHTML(),
      fileId:fileId,
      createdBy:user?.primaryEmailAddress?.emailAddress
    })
  };
  if (!editor) return null;
  return (
    <div className="p-5">
      <div className="control-group">
        <div className="button-group flex gap-5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "text-blue-500" : ""}
          >
            <Italic />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={
              editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
            }
          >
            <AlignLeft />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={
              editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
            }
          >
            <AlignCenter />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={
              editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
            }
          >
            <AlignRight />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={editor.isActive({ level: 1 }) ? "is-active" : ""}
          >
            <Heading1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={editor.isActive({ level: 2 }) ? "is-active" : ""}
          >
            <Heading2 />
          </button>
          <button onClick={() => onAiClick()} className={"hover:text-blue-500 hover:cursor-pointer"}>
            <Sparkles />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorExtension;
