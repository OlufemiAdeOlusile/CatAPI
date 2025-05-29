import { setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { AxiosResponse } from 'axios';
import {Vote} from "../types/cat.types";

class CustomWorld {
    votes: Vote[] = [];
    selectedVote: Vote | null = null;
    response: AxiosResponse | null = null;
}

setDefaultTimeout(20 * 1000);
setWorldConstructor(CustomWorld);