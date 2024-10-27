import { jsPDF } from 'jspdf';

export const exportToPDF = (data: any) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(16);
  doc.text('Calculation Results', 20, 20);
  
  // Add data
  doc.setFontSize(12);
  let yPos = 40;
  Object.entries(data).forEach(([key, value]) => {
    doc.text(`${key}: ${value}`, 20, yPos);
    yPos += 10;
  });
  
  // Save the PDF
  doc.save('calculation-results.pdf');
};

export const exportToCSV = (data: any) => {
  const rows = Object.entries(data).map(([key, value]) => `${key},${value}`);
  const csvContent = `data:text/csv;charset=utf-8,${rows.join('\n')}`;
  const encodedUri = encodeURI(csvContent);
  
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'calculation-results.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data: any) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'calculation-results.json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};