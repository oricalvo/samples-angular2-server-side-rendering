import {ContactsState} from "./contact.service";
import {AppStore} from "t-rex/AppStore";
import {ServiceStore} from "t-rex/ServiceStore";

export interface AppState {
    contacts: ContactsState,
}

export class RootService {
    store = ServiceStore.create<AppState>("/", {
        contacts: {
            all: null,
        },
    });
}

//export const appStore = new AppStore<AppState>();
