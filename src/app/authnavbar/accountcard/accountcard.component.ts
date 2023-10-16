import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accountcard',
  templateUrl: './accountcard.component.html',
  styleUrls: ['./accountcard.component.css']
})
export class AccountcardComponent {
  @Input() firstName: string | undefined;
  @Input() lastName: string | undefined;
  @Input() emailAddress: string | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() status:string|undefined;
}
