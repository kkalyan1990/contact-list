import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ContactserviceService } from '../contactservice.service';
import { CommonModule, NgFor } from '@angular/common';
import { contactselected } from '../store/contact.actions';
import { Store, StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ContactObject } from '../contact-object';
import { SelectedContact } from '../selected-contact';

@Component({
  selector: 'app-left-panel',
  standalone: true,
  imports: [NgFor, CommonModule,  StoreModule],
  providers:[ContactserviceService],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})

export class LeftPanelComponent {
  private _contactList: Array<ContactObject> = [];
  showDeleteIcon: boolean = false;
  contactId: string = '';
  sortedContactList: any = [];
  contactList: any = [];
  private _isViewMode: boolean = true;
  contactDetails$: Observable<any>;
  contactListArr$: Observable<any>;
  @Output() myEvent = new EventEmitter<boolean>();
  @Input()
  set isViewMode(val: boolean){
    this._isViewMode = val;  
  } 
  get isViewMode(): boolean { 
    return this._isViewMode;
  }

  // @Input()
  // set contactList(val: any){
  //   this._contactList = val;  
  //   this.sortContacts();
  // } 
  // get contactList(): any { 
  //   return this._contactList;
  // }

  constructor(private store: Store<SelectedContact>, private contactService : ContactserviceService){
    this.contactDetails$ = store.select('selectedContact');
    this.contactListArr$ = store.select('contactList');
    this.contactDetails$.subscribe((data: SelectedContact) => {
       this.contactId = data.selectedContact?.id.toString();
    }) 
    this.contactListArr$.subscribe((data: any) => {
      this.contactList = data.contactList;
      this.sortContacts();
     })
  }

  selectContact(id: any) {
    if(this.contactId === undefined) {
      this.isViewMode = true;
      this.updateEditMode();
    }
    const selectedContact = this.contactList.filter((x :any) => x.id === id)[0];
    this.store.dispatch(contactselected({ selectedContact: selectedContact }));
  }


  deleteContact(id: string) {
    this.contactService.deleteContact(id).subscribe(res => {
      console.log(res);
    });
  }

  updateEditMode() {
    this.myEvent.emit(this.isViewMode);
  }

  sortContacts() {
    let sortedContactsObj = this.contactList.reduce((contactGroup: any, contactObj:any) => {
      let group = contactObj.firstName[0].toUpperCase();
      if(!contactGroup[group]){
        contactGroup[group] = {group, children: [contactObj]}
      } else {
        contactGroup[group].children.push(contactObj);
      }
      return contactGroup;
    }, {})

    this.sortedContactList = Object.values(sortedContactsObj);
    const sortFn = (object1:any, object2: any) => {
      if(object1.group > object2.group) {
        return 1;
      } else {
        return -1;
      }
    }
    this.sortedContactList = this.sortedContactList.sort(sortFn)
  }
}
