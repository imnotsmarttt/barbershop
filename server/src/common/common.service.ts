import {Injectable} from '@nestjs/common';
import {ISplitDatetime} from "./common.interface";

@Injectable()
export class CommonService {

    // returns time from datetime
    getTimeFromDatetime(date: string): string {
        const d = new Date(date)

        return new Intl.DateTimeFormat('ru', {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).format(d)
    }

    // return date from datetime
    getDateFromDatetime(date: string): string {
        const d = new Date(date)

        return new Intl.DateTimeFormat('ru', {
            year: "numeric",
            month: "numeric",
            day: "numeric"
        }).format(d)
    }

    // return object with date and time
    getDateAndTimeFromDatetime(date: string): ISplitDatetime {
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
        return new Intl.DateTimeFormat('ru', {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).format(incrementedTime)
    }
}
