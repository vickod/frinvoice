import { FormFieldsType } from "@/lib/zodSchemas";
import UserDetailsPdf from "./invoicePdf/UserDetailsPdf";
import InvoiceDetailsPdf from "./invoicePdf/InvoiceDetailsPdf";
import ProductsRowsPdf from "./invoicePdf/ProductsRowsPdf";
import PaymentNotePdf from "./invoicePdf/PaymentNotePdf";
import SummaryCardPdf from "./invoicePdf/SummaryCardPdf";
import CommentPdf from "./invoicePdf/CommentPdf";
import FooterPdf from "./invoicePdf/FooterPdf";

type InvoicePdfProps = {
  formData: FormFieldsType;
  previewUrl: string | null;
  contentRef: React.RefObject<HTMLDivElement | null>;
};

export default function InvoicePdf({
  formData,
  previewUrl,
  contentRef,
}: InvoicePdfProps) {
  return (
    <div
      className="bg-white p-10  shadow-md  flex flex-col justify-between border mx-auto "
      style={{ width: "794px", minHeight: "1123px" }}
      id="pdf-content"
      ref={contentRef}
    >
      <div>
        <UserDetailsPdf formData={formData} previewUrl={previewUrl} />

        <InvoiceDetailsPdf formData={formData} />

        <ProductsRowsPdf formData={formData} />

        <div className="mt-10 flex justify-between items-end">
          <PaymentNotePdf formData={formData} />

          <SummaryCardPdf formData={formData} />
        </div>
        <CommentPdf formData={formData} />
      </div>
      <FooterPdf formData={formData} />
    </div>
  );
}
