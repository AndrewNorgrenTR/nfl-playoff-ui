import {Injectable} from "@angular/core";
import * as lscache from "lscache";

@Injectable()
/**
 * Wrapper for lscache.
 */
export class LocalStorageService {
    private EXPIRE_TIME: number = 60 * 24 * 365 * 2; // 2 years, in minutes

    get(key: string): any {
        return lscache.get(key);
    }

    set(key: string, value: any, expiresInMinutes: number = this.EXPIRE_TIME): void {
        lscache.set(key, value, expiresInMinutes);
    }

    remove(key: string) {
        lscache.remove(key);
    }

    flushExpired(): void {
        lscache.flushExpired();
    }
}
