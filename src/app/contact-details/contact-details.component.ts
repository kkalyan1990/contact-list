import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, NgModelGroup, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContactserviceService } from '../contactservice.service';
import {ContactObject } from '../contact-object';
import { SelectedContact } from '../selected-contact';
import { addcontact } from '../store/contact.actions';
@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, StoreModule,FormsModule, ReactiveFormsModule],
  providers: [NgModelGroup],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {

  @Output() myEvent = new EventEmitter<boolean>();
  contactDetails$: Observable<any>;
  contactListArr$: Observable<any>;

  isViewMode: boolean = true;
  isNewContact: boolean = false;
  contactDetails: ContactObject =   new ContactObject();
  constructor(private store: Store<SelectedContact>, private contactService : ContactserviceService) {
    this.contactDetails$ = store.select('selectedContact');
    this.contactListArr$ = store.select('contactList');
    
    this.contactDetails$.subscribe((data: SelectedContact) => {
     this.contactDetails = data.selectedContact;
    })
    // this.contactListArr$.subscribe((data: any) => {
    //   // console.log(data);
    //  })
  }

  saveChanges(contactForm: NgForm) {
    const contactId = this.contactDetails.id;
    this.contactDetails = contactForm.value.contactDetails;
    this.contactDetails.id = contactId;
    if(this.isNewContact) {
      this.contactService.addContact(this.contactDetails);
      // this.store.dispatch(addcontact({ newContact: this.contactDetails }));
      this.isNewContact = false;
    } else {
      this.isNewContact = false;
      this.contactService.updateContact(this.contactDetails);
    }
    this.updateEditMode();
    
  }

  addNewContact(): void {
    this.contactDetails =  new ContactObject(); 
    this.isNewContact = true;
    this.isViewMode = false;
  }

  updateEditMode(): void {
    this.isViewMode = !this.isViewMode;
    this.myEvent.emit(this.isViewMode);
  }

 
}
