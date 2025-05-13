import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Controller } from "react-hook-form";

type CommentProps = {
  control: any;
  commentName: string;
  errors: any;
};

const Comment = ({ control, commentName, errors }: CommentProps) => {
  return (
    <div className="mt-10 flex flex-col gap-2">
      <Label className="text-neutral-600">Commentaires:</Label>
      <Controller
        name={commentName}
        control={control}
        render={({ field }) => (
          <Textarea className="dark:bg-zinc-900" {...field} />
        )}
      />
      {errors?.comment && (
        <p className="text-red-500 text-xs">{errors.comment.message}</p>
      )}
    </div>
  );
};

export default Comment;
