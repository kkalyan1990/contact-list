import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { contactselected, setContactList } from './store/contact.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {
  contactListArr$: Observable<any>;
  contactList:Array<any> = [];

  constructor(private store: Store<{ selectedContact: Object, contactList: Array<any>}>) { 
    this.contactListArr$ = store.select('contactList');
    this.getContactList();
  }

  getContactList() {
    this.contactListArr$.subscribe((data: any) => {
      this.contactList = data.contactList;
     })
  }

  updateContact(contactObj: any) {
    const tempContactList =JSON.parse(JSON.stringify(this.contactList)); 

    const contactId = contactObj.id;
    const index = tempContactList.findIndex((x: any) => x.id === contactId);
    if(index >= 0){
      tempContactList[index] = contactObj;
    }
    this.store.dispatch(contactselected({ selectedContact: contactObj }));
    this.store.dispatch(setContactList({ contactList: tempContactList }));
    return of(true);
  }

  addContact(contactObj: any) {
    const id = this.contactList.length + 1;
    contactObj.id = id;
    const tempContactList = [contactObj,...this.contactList];
    // this.contactList.push(contactObj);
    this.store.dispatch(setContactList({ contactList: tempContactList }));
    this.store.dispatch(contactselected({ selectedContact: contactObj }));
  }

  deleteContact(contactId: any) {
    const index = this.contactList.findIndex(x => x.id === contactId);
    const tempList = JSON.parse(JSON.stringify(this.contactList));
    this.contactList = [...tempList.slice(0, index), ...tempList.slice(index + 1)];
    this.store.dispatch(setContactList({ contactList: this.contactList }));
    return of(true);
  }
}
