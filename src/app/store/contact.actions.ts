import { createAction, props } from "@ngrx/store";

export const contactselected = createAction(
    '[contact] selected',
    props<{ selectedContact: string }>()
  );


  export const addcontact = createAction(
    '[contact] added',
    props<{ newContact: any }>()
  );

  export const setContactList = createAction(
    '[contact] setContactList',
    props<{ contactList: any }>()
  );
