import { createReducer, on } from "@ngrx/store";
import { addcontact, contactselected, setContactList } from "./contact.actions";
import { SelectedContact } from "../selected-contact";
import { ContactObject } from "../contact-object";
import { contactList } from "../sampleData";


export const initialState: SelectedContact = { selectedContact: new ContactObject(), contactList: contactList };

export const contactReducer = createReducer(
    initialState,
    on(contactselected, (state, action) =>{
        return { selectedContact: action.selectedContact as unknown as ContactObject, contactList: state.contactList };
    }),
    on(addcontact, (state, action) =>{
        return { selectedContact: state.selectedContact as unknown as ContactObject, contactList: [ action.newContact,...state.contactList] };
    }),
    on(setContactList, (state, action) =>{
        return { selectedContact: state.selectedContact , contactList: action.contactList };
    }),
);