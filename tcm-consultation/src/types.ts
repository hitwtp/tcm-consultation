export interface DiagnosisData {
  patientName: string;
  patientAge: number;
  patientGender: string;
  chiefComplaint: string;
  symptoms: string[];
  tongueImage: string | null;
  faceImage: string | null;
  handImage: string | null;
  pulseDescription: string;
  diagnosisTime: string;
}

export interface DiagnosisResult {
  syndrome: string;
  syndromeDescription: string;
  pathogenesis: string;
  treatment principle: string;
  prescription: Medicine[];
  lifestyleAdvice: string[];
  prognosis: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  usage: string;
}

export interface PatientRecord {
  id: string;
  data: DiagnosisData;
  result: DiagnosisResult;
  createdAt: string;
}