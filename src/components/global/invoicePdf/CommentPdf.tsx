import { FormFieldsType } from "@/lib/zodSchemas";
import React from "react";

const CommentPdf = ({ formData }: { formData: FormFieldsType }) => {
  return (
    <div className="mt-20">
      <p className="text-xs">{formData.comment && formData.comment}</p>
    </div>
  );
};

export default CommentPdf;
