import {ServiceStore} from "t-rex/ServiceStore";
import {Activity} from "t-rex/decorators";

export interface Contact {
    id: number;
    name: string;
}

export interface ContactsState {
    all: Contact[];
}

export class ContactService {
    store = ServiceStore.create<ContactsState>("contacts", {
        all: null,
    });

    constructor() {
        console.log("XXX");
    }

    get state() {
        return this.store.getState();
    }

    @Activity()
    loadAll(): Promise<Contact[]> {
        if(this.state.all) {
            return Promise.resolve(this.state.all);
        }

        console.log("ContactService.getAll");

        const now = new Date().valueOf();

        return Promise.resolve([
            {id:1, name: "Ori" + now},
            {id:2, name: "Roni" + now},
        ]).then(contacts => {
            this.store.update({
                all: contacts
            });

            return contacts;
        });
    }
}
