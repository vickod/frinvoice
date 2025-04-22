import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const CommentPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="mt-10">
      <p className="text-xs break-words">
        {formData.comment && formData.comment}
      </p>
    </div>
  );
};

export default CommentPdf;
