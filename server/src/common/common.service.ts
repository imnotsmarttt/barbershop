import { Injectable } from '@nestjs/common';
import {SplitDatetimeDto} from "./common.dto";

@Injectable()
export class CommonService {
    // returns time from datetime
    getTimeFromDatetime(date: string): string {
        const d = new Date(date)
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const hours = d.getHours();
        const minutes = d.getMinutes();
        const seconds = d.getSeconds();
        const utcDate = new Date(year, month, day, hours, minutes, seconds);
        return `${String(utcDate.getHours()).padStart(2, '0')}:${String(utcDate.getMinutes()).padStart(2, '0')}:${String(utcDate.getSeconds()).padStart(2, '0')}`;
    }

    // return date from datetime
    getDateFromDatetime(date: string): string {
        const d = new Date(date)
        return d.toISOString().split('T')[0]
    }

    // return object with date and time
    getDateAndTimeFromDatetime(date: string): SplitDatetimeDto {
        return {
            date: this.getDateFromDatetime(date),
            time: this.getTimeFromDatetime(date)
        }

    }

    // increment time or/and convert to string
    incrementTime(time: string, incrementMinutes: number = 0): string {
        const [hours, minutes, seconds] = time.split(':')

        const incrementedTime = new Date();
        incrementedTime.setHours(Number(hours));
        incrementedTime.setMinutes(Number(minutes) + incrementMinutes);
        incrementedTime.setSeconds(Number(seconds));
        return `${String(incrementedTime.getHours()).padStart(2, '0')}:${String(incrementedTime.getMinutes()).padStart(2, '0')}:${String(incrementedTime.getSeconds()).padStart(2, '0')}`;
    }
}
