import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsUrl = 'http://www.mocky.io/v2/581335f71000004204abaf83';

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsUrl);
  }

}
