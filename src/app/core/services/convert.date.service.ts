import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";


@Injectable()
export class ConvertDate {

    public toTimestamp = (strDate: string): number => {
        let [datePart, timePart] = strDate.split(' ');
        datePart = datePart.split("/").reverse().join('-');
        let newDate = DateTime.fromISO(`${datePart}T${timePart}`).toLocal().toFormat('x');
        const result = Number(newDate);
        return result;
    };
    public dateToTimestamp = (strDate: string): number => {
        const newFormat = strDate.split("/").reverse().join('-');
        let newDate = DateTime.fromISO(newFormat).toLocal().toFormat('x');
        const result = Number(newDate);
        return result;
    };
    public currentDate = (): number => {
        const data = DateTime.now().toFormat('x');
        return Number(data);
    };
    public toDate = (date: number): string => {
        const newDate = DateTime.fromMillis(date)
            .setLocale('pt-br')
            .toLocaleString(DateTime.DATETIME_SHORT);
        return newDate.split(',')[0];
    };
    public invertDateString(dateStr: string): string {
        const parts = dateStr.split('-');
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }


}