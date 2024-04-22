import { createAction, props } from "@ngrx/store";
import { ContactObject } from "../contact-object";

export const contactselected = createAction(
    '[contact] selected',
    props<{ selectedContact: ContactObject }>()
  );

  export const addcontact = createAction(
    '[contact] added',
    props<{ newContact: ContactObject }>()
  );

  export const setContactList = createAction(
    '[contact] Set contact list array',
    props<{ contactList: Array<ContactObject> }>()
  );
