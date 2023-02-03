import { Table } from "reactstrap"
import { ButtonsAvaibleSuites } from "./ButtonsAvaibleSuites"
import { DateRangePicker } from "./DateRangePicker"

export const FormReservation = ({
    totalDays,
    totalAmount,
    isValidInfo,
    isLoading,
    dateRange,
    setDateRange,
    setNumSuite,
    numSuite,
    dataSuites,
    price,
}) => {

    return (
        <>
            <DateRangePicker
                isLoading={isLoading}
                setDateRange={setDateRange}
                dateRange={dateRange}
            />
            
            <ButtonsAvaibleSuites
                isLoading={isLoading}
                setNumSuite={setNumSuite}
                numSuite={numSuite}
                dataSuites={dataSuites}
            />

            {
                (dataSuites.length > 0 && isValidInfo) && (
                    <ResumeOfReservation
                        totalAmount={totalAmount}
                        totalDays={totalDays}
                        price={price}
                        dateRange={dateRange}
                    />
                )
            }

        </>
    )
}


const ResumeOfReservation = ({
    totalAmount,
    totalDays,
    price,
    dateRange
}) => {
    
    return (
        <div className='container mt-3'>


            <ResumeOfReservationTable
                price={price}
                totalAmount={totalAmount}
                totalDays={totalDays}
                dateRange={dateRange}
            />

        </div>
    )

}


const ResumeOfReservationTable = ({
    totalAmount,
    totalDays,
    price,
    dateRange
}) => {
    return (
        <Table bordered>
            <thead>
                <tr>
                    {/* <th>#</th> */}
                    <th>Amount per day</th>
                    <th>Total days</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    {/* <th scope="row">1</th> */}
                    <td>${price}</td>
                    <td>{totalDays}</td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <th colSpan={1}>
                        Total: $ {totalAmount}

                    </th>
                    <td>
                    [ {new Date(dateRange.startDate).toDateString()} - {new Date(dateRange.endDate).toDateString()} ]

                    </td>

                </tr>

            </tfoot>

        </Table>
    )
}
