import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Controller } from "react-hook-form";

type CommentProps = {
  control: any;
  commentName: string;
};

const Comment = ({ control, commentName }: CommentProps) => {
  return (
    <div className="mt-10 flex flex-col gap-2">
      <Label>Commentaires</Label>
      <Controller
        name={commentName}
        control={control}
        render={({ field }) => <Textarea {...field} />}
      />
    </div>
  );
};

export default Comment;
