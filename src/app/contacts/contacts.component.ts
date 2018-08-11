import { Component, OnInit } from '@angular/core';

import { Contact } from './shared/contact.model';
import { ContactService } from './shared/contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: Contact[];

  columnIds = ['name', 'phone_number', 'address'];

  sortedColumn: string;
  ascendingSort: boolean;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => this.contacts = contacts);
  }

  /**
   * Sort the contact array according to the event source element id.
   *
   * @param event the click event
   */
  onSort(event: MouseEvent) {
    const columnId = event.srcElement.id;

    this.ascendingSort = this.sortedColumn === columnId ? !this.ascendingSort : true;
    this.sortedColumn = columnId;

    this.contacts.sort((contact1, contact2) => {
      let result = contact1[columnId].localeCompare(contact2[columnId]);

      if (!this.ascendingSort) {
        result = -result;
      }

      return result;
    });
  }

}
