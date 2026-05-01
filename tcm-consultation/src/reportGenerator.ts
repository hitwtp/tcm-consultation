import { jsPDF } from 'jspdf';
import { DiagnosisData, DiagnosisResult } from './types';

export function generatePDFReport(data: DiagnosisData, result: DiagnosisResult): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(200, 50, 50);
  doc.text('中医问诊报告', pageWidth / 2, 25, { align: 'center' });

  doc.setDrawColor(200, 50, 50);
  doc.line(20, 30, pageWidth - 20, 30);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text('一、患者基本信息', 20, 45);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);

  const patientInfo = [
    ['姓名', data.patientName || '未填写'],
    ['年龄', `${data.patientAge}岁`],
    ['性别', data.patientGender],
    ['就诊时间', new Date(data.diagnosisTime).toLocaleString('zh-CN')]
  ];

  let yPos = 52;
  patientInfo.forEach(([label, value]) => {
    doc.text(`${label}：${value}`, 25, yPos);
    yPos += 7;
  });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('二、主诉与症状', 20, yPos + 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);

  yPos += 15;
  doc.text(`主诉：${data.chiefComplaint}`, 25, yPos);
  yPos += 7;
  doc.text(`症状：${data.symptoms.join('、')}`, 25, yPos);
  yPos += 7;
  doc.text(`脉象描述：${data.pulseDescription || '未填写'}`, 25, yPos);

  yPos += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('三、辨证分析', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  yPos += 8;

  doc.text(`证型：${result.syndrome}`, 25, yPos);
  yPos += 7;
  doc.text(`证候描述：${result.syndromeDescription}`, 25, yPos);
  yPos += 10;
  doc.text(`病机分析：${result.pathogenesis}`, 25, yPos);
  yPos += 10;
  doc.text(`治疗原则：${result.treatment principle}`, 25, yPos);

  yPos += 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('四、处方用药', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  yPos += 8;

  result.prescription.forEach((med, index) => {
    doc.text(`${index + 1}. ${med.name} ${med.dosage} - ${med.usage}`, 25, yPos);
    yPos += 7;
  });

  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('五、生活调护建议', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  yPos += 8;

  result.lifestyleAdvice.forEach((advice, index) => {
    const lines = doc.splitTextToSize(`${index + 1}. ${advice}`, pageWidth - 50);
    doc.text(lines, 25, yPos);
    yPos += lines.length * 6 + 3;
  });

  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('六、预后评估', 20, yPos);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  yPos += 8;

  const prognosisLines = doc.splitTextToSize(result.prognosis, pageWidth - 50);
  doc.text(prognosisLines, 25, yPos);

  doc.setDrawColor(200, 50, 50);
  doc.line(20, 280, pageWidth - 20, 280);

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('本报告由中医问诊系统生成，仅供参考。具体用药请咨询执业中医师。', pageWidth / 2, 287, { align: 'center' });
  doc.text(`生成时间：${new Date().toLocaleString('zh-CN')}`, pageWidth / 2, 292, { align: 'center' });

  doc.save(`中医问诊报告_${data.patientName}_${new Date().toISOString().split('T')[0]}.pdf`);
}

export function downloadReport(data: DiagnosisData, result: DiagnosisResult): void {
  generatePDFReport(data, result);
}