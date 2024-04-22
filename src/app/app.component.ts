import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { Store, StoreModule } from '@ngrx/store';
import { ContactserviceService } from './contactservice.service';
import { ContactObject } from './contact-object';
import { Observable } from 'rxjs';
import { SelectedContact } from './selected-contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftPanelComponent, ContactDetailsComponent, StoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isViewMode = true;

  contactDetails$: Observable<ContactObject>;
  contactListArr$: Observable<Array<ContactObject>>;
  
  contactList : Array<ContactObject> = [];
  constructor(private store: Store<SelectedContact>, private contactService : ContactserviceService){
    this.contactDetails$ = store.select('selectedContact');
    this.contactListArr$ = store.select('contactList');

    this.contactListArr$.subscribe((data: any) => {
      this.contactList = data.contactList;
     })
  }

  onModeChange(viewMode: boolean): void {
    this.isViewMode = viewMode;
  }
}
