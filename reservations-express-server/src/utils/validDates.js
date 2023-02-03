const formatsDates = [ /^([0-9]{2}[-]){2}([0-9]){4}$/,
 /^([0-9]{1}[-]){2}([0-9]){4}$/,
 /^([0-9]{2}[-][0-9]{1}[-])([0-9]){4}$/,
 /^([0-9]{1}[-][0-9]{2}[-])([0-9]){4}$/,]


export const isValidFormatDate = ( date ) => {
    return (
        date.match(formatsDates[0]) ||
        date.match(formatsDates[1]) ||
        date.match(formatsDates[2]) ||
        date.match(formatsDates[3])
    )
}