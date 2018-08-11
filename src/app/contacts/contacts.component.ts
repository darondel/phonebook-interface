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
  filteredContacts: Contact[];

  columnIds = ['name', 'phone_number', 'address'];

  sortedColumn: string;
  ascendingSort: boolean;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => this.filteredContacts = this.contacts = contacts);
  }

  /**
   * Filter the contact array according to the event source value.
   *
   * @param event the input event
   */
  onFilter(event: InputEvent) {
    const filter = event.srcElement.value;

    this.filteredContacts = this.contacts.filter(contact => {
      return contact.name.includes(filter) || contact.phone_number.includes(filter) || contact.address.includes(filter);
    });
  }

  /**
   * Sort the contact array according to the event source element id.
   *
   * @param event the mouse event
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
