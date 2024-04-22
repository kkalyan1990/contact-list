export class ContactObject {
    id: string | number;
     firstName: string; 
     lastName: string; 
     email: string; 
     phone: string; 
     address:string; 
     note: string;

     constructor() {
        this.id = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.note = '';
     }
}


