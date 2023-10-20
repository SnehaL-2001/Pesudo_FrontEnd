import { Component } from '@angular/core';
import { UserserviceService } from 'src/app/services/userservice.service';
import { TransactionHistory } from 'src/module/transactionHistory';
import { DataTableDirective } from 'angular-datatables';

import jsPDF from 'jspdf';
@Component({
  selector: 'app-rechargehistory',
  templateUrl: './rechargehistory.component.html',
  styleUrls: ['./rechargehistory.component.css']
})
export class RechargehistoryComponent {
  transactionHistory: TransactionHistory[] = [];  constructor(private userservice: UserserviceService) { }
  dtoptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.dtoptions = {

      pagingType: 'full_numbers',

      searching: true,

      lengthChange: false,

      language: {

        searchPlaceholder: 'Search Here'

      }

    };

    const email = sessionStorage.getItem('emailAddress');
    const phoneNumber = sessionStorage.getItem('phoneNumber');

    if (email) {
      this.getTransactionHistoryByEmail(email);
    } else if (phoneNumber) {
      this.getTransactionHistoryByPhoneNumber(phoneNumber);
    }
  }

  getTransactionHistoryByEmail(email: string): void {
    this.userservice.getTransactionHistoryByEmail(email)
      .subscribe((data) => {
        this.transactionHistory = data;
      });
  }

  getTransactionHistoryByPhoneNumber(phoneNumber: string): void {
    this.userservice.getTransactionHistoryByPhoneNumber(phoneNumber)
      .subscribe((data) => {
        this.transactionHistory = data;
      });
  }

  downloadBill(transaction: TransactionHistory) {
    const doc = new jsPDF();
    const accentColor = [0, 102, 204];

    doc.setFontSize(24);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text('Recharge Invoice', 105, 20, { align: 'center' });

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const invoiceId = transaction.invoiceID;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Date: ${formattedDate}`, 180, 30, { align: 'right' });
    doc.text(`Invoice ID: ${invoiceId}`, 180, 35, { align: 'right' });

    doc.setFontSize(14);
    doc.text('Customer Information:', 20, 50);

    doc.setFontSize(12);
    doc.text(`Name: ${transaction.firstName} ${transaction.lastName}`, 20, 60);
    doc.text(`Email: ${transaction.emailAddress}`, 20, 70);
    doc.text(`Phone: ${transaction.phoneNumber}`, 20, 80);

    doc.setFontSize(14);
    doc.text('Recharge Details:', 20, 100);

    doc.setFontSize(12);
    doc.text(`Transaction ID: ${transaction.transactionId}`, 20, 110);
    doc.text(`Transaction Date: ${transaction.date}`, 20, 120);
    doc.text(`Plan: ${transaction.planName}`, 20, 130);
    doc.text(`Recharge Amount: $${transaction.planPrice.toFixed(2)}`, 20, 140);
    doc.text(`Payment Method: ${transaction.paymentMethod}`, 20, 150);
    doc.text(`Payment Method ID: ${transaction.paymentMethodId}`, 20, 160);
    doc.text(`Wallet Used: ${transaction.wallet}`, 20, 170);
    doc.text(`Next Payment On: ${transaction.nextPaymentDate}`, 20, 180);
   
    doc.setFontSize(14);
    doc.text(`Total Amount: $${transaction.paid.toFixed(2)}`, 190, 190, { align: 'right' });

    const pdfData = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl);
  }

  downloadInvoice() {
    const doc = new jsPDF();
    const accentColor = [0, 102, 204];
    const lineHeight = 10;
    const cardWidth = 180;
    const cardHeight = 150;

    this.transactionHistory.forEach((transaction, index) => {
      if (index > 0) {
        doc.addPage();
      }

      doc.setFontSize(18);
      doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.text('Recharge Invoice', 105, 20, { align: 'center' });

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const invoiceId = transaction.invoiceID;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`Date: ${formattedDate}`, 180, 30, { align: 'right' });
      doc.text(`Invoice ID: ${invoiceId}`, 180, 35, { align: 'right' });

      const cardX = 20;
      const cardY = 50;
      doc.setDrawColor(0);
      doc.setFillColor(240, 240, 240);
      doc.rect(cardX, cardY, cardWidth, cardHeight, 'F');
      doc.setFontSize(12);

      doc.text(`Name: ${transaction.firstName} ${transaction.lastName}`, cardX + 5, cardY + lineHeight);
      doc.text(`Email: ${transaction.emailAddress}`, cardX + 5, cardY + 2 * lineHeight);
      doc.text(`Phone: ${transaction.phoneNumber}`, cardX + 5, cardY + 3 * lineHeight);

      doc.text(`Transaction ID: ${transaction.transactionId}`, cardX + 5, cardY + 5 * lineHeight);
      doc.text(`Transaction Date: ${transaction.date.toLocaleString()}`, cardX + 5, cardY + 6 * lineHeight);
      doc.text(`Plan: ${transaction.planName}`, cardX + 5, cardY + 7 * lineHeight);
      doc.text(`Recharge Amount: $${transaction.planPrice.toFixed(2)}`, cardX + 5, cardY + 8 * lineHeight);
      doc.text(`Payment Method: ${transaction.paymentMethod}`, cardX + 5, cardY + 9 * lineHeight);
      doc.text(`Payment Method ID: ${transaction.paymentMethodId}`, cardX + 5, cardY + 10 * lineHeight);
      doc.text(`Next Payment On: ${transaction.nextPaymentDate.toLocaleString()}`, cardX + 5, cardY + 11 * lineHeight);
      doc.text(`Wallet Used: ${transaction.wallet}`, cardX + 5, cardY + 12 * lineHeight);     
       doc.text(`Amount Paid On: ${transaction.paid}`, cardX + 5, cardY + 13 * lineHeight);


    });

    const pdfData = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfData);
    window.open(pdfUrl);
  }
}

