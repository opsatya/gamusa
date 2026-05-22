// import { UploadedFile } from "@/components/UploadFile";

/* ================= TYPES ================= */
export type DocumentStatus =
  | 'UPLOADED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED';

export interface ApplicantDocument {
  id: number;
  documentName: string;
  documentType: string;
  uploadedAt: string;
  lastModified: string;
  status: DocumentStatus;
  comments?: string;
}

export interface AddDocumentInitialValues {
  txtDocumentName: string;
  ddlDocumentType: string;
  txtDateOfUpload: string;
  txtComments: string;
  //TODO: add type here
  // txtDocumentFile: UploadedFile[];
  txtDocumentFile: any[];
}
