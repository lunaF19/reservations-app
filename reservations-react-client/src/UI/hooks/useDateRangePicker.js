import { useState } from "react";

export const useDateRangePicker = () => {

    const initalRangeDate = {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection"
    };

    const [dateRange, setDateRange] = useState(initalRangeDate)

    const extractParamsOfRages = (separator = "-") => {
        try {
            const startDate = new Date(dateRange.startDate);
            const endDate = new Date(dateRange.endDate);

            const startDateParams = {
                //day: startDate.getUTCDate() < 10 ? `0${startDate.getUTCDate()}` : startDate.getUTCDate(),
                day: startDate.getUTCDate(),
                //month: startDate.getMonth() < 10 ? `0${startDate.getMonth() + 1}` : startDate.getMonth() + 1,
                month: startDate.getMonth()+1,
                year: startDate.getFullYear()
            };

            console.log(startDate.getUTCDate())

            const endDateParams = {
                //day: endDate.getUTCDate() < 10 ? `0${endDate.getUTCDate()}` : endDate.getUTCDate(),
                day: endDate.getUTCDate(),
                //month: endDate.getMonth() < 10 ? `0${endDate.getMonth() + 1}` : endDate.getMonth() + 1,
                month: endDate.getMonth()+1,
                year: endDate.getFullYear()
            };

            const date1 = `${startDateParams.day}${separator}${startDateParams.month}${separator}${startDateParams.year}`
            const date2 = `${endDateParams.day}${separator}${endDateParams.month}${separator}${endDateParams.year}`

            const diferenceBetweenDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const totalOfDays = diferenceBetweenDays + 1;

            return {
                startDateParams,
                endDateParams,
                diferenceBetweenDays,
                totalOfDays,
                date1,
                date2,

            }
        } catch (err) {
            console.error(err)
        }

    };


    return {
        dateRange,
        setDateRange,

        extractParamsOfRages,


    }
}