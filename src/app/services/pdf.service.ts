import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdfGenerationUrl = 'http://localhost:8036/api/generate-pdf';

 

  generatePdf(transactionDetails: any) {
    console.log(transactionDetails);
    return this.http.post(this.pdfGenerationUrl, transactionDetails, { responseType: 'arraybuffer' });
  }

  downloadPdf(pdfData: ArrayBuffer): void {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  constructor(private http:HttpClient) { }
}
