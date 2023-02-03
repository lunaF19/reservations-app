import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file


export const DateRangePicker = ({
  isLoading,
  setDateRange,
  dateRange,
}) => {
  
  return (
    <>
      <DateRange
        disabled={isLoading}
        
        ranges={[dateRange]}
        onChange={({ selection }) => { setDateRange(selection); }}
        range={[dateRange]}
        disabledDay={(dataCalendar) => {
          const diference = (new Date() - dataCalendar) / (1000 * 60 * 60 * 24);
          //const diferenceDateSelecte = ( dataCalendar - dateRange.startDate) /(1000*60*60*24)
          //return diference > -3 ||
          //console.log(diferenceDateSelecte)
          return diference > -3; // ||  diferenceDateSelecte > 6
          //return new Date ;
        }}
      />
    </>
  );
}
