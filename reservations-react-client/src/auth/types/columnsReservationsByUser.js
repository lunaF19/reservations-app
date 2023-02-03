import Timestamp from 'react-timestamp'

export const columnsReservationsByUser = [
    {
        id: "_id",
        name: "#Reservation",
        selector: "id",
        width: "20%",
        center: true,
        style: {
            textAlign: "center",
        }
    },
    // {
    //     id: "_id_suite",
    //     name: "#Suite",
    //     selector: "id_suite",
    //     width: "10%",
    //     center: true,
    // },
    {
        id: "_date_made",
        name: "Made",
        //     selector: "date_made",
        cell: (data) => <Timestamp relative date={data.date_made} />,
        width: "15%",
        center: true,
    },
    // {
    //     id: "_date_made",
    //     name: "Se hizo",
    //     selector: "date_made"
    // },
    // {
    //     id: "id_user",
    //     name: "id_user",
    //     selector: "id_user"
    // },
    {
        id: "_applyfor",
        name: "Apply",
        //     selector: "date_made",
        cell: ({ date_init, date_end, id_suite }) => {
            if (date_init === date_end) return (<>For date {date_init} in the suite #{id_suite}</>)

            return (
                <>
                    From {new Date(date_init).toDateString()} to {new Date(date_end).toDateString()} in the suite #{id_suite}.
                </>
            )
        },
        width: "40%",
        center: true,
    },

    // {
    //     id: "_date_init",
    //     name: "Desde",
    //     selector: "date_init"
    // },
    // {
    //     id: "date_end",
    //     name: "Hasta",
    //     selector: "date_end"
    // },

    {
        id: "_total_days",
        name: "Days",
        selector: "total_days",
        width: "10%",
        center: true,
    },
    {
        id: "_total_amount",
        name: "Amount",
        selector: "total_amount",
        cell: ({total_amount})=> <>${total_amount}</>,
        width: "15%",
        center: true,
    },
]