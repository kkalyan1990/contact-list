import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StoreModule, provideStore } from '@ngrx/store';
import { contactReducer } from './store/contact.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),  importProvidersFrom(StoreModule.forRoot({ selectedContact: contactReducer, contactList: contactReducer}))]
};
