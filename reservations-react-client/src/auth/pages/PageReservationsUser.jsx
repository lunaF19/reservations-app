import React, { useEffect, useState } from 'react'
import { Col, Row } from 'reactstrap'

import DataTable from 'react-data-table-component';

import { LoadingTableData, usePetitions } from '../../UI';
import { CardWithShadow } from '../../UI/components/CardWithShadow'

import { typesPetitions } from '../../UI';


import { columnsReservationsByUser } from '../types/columnsReservationsByUser';

export const PageReservationsUser = () => {

    const [dataGrid, setDataGrid] = useState([])
    //const [dml, setDml] = useState(null)
    const [gridDataLoading, setGridDataLoading] = useState(false)

    const { setIndicatorPetition, dataPetition } = usePetitions()

    //const onClickBtn1 = item => {console.log(item)}

    const columnsGrid = [...columnsReservationsByUser]

    useEffect(() => {
        setGridDataLoading(true)
        setTimeout(() => setIndicatorPetition(typesPetitions.getReservationsByUser), 1000)
        return clearTimeout
    }, [])

    useEffect(() => {
        switch (dataPetition.indicatorPetition) {
            case typesPetitions.getReservationsByUser:
                setGridDataLoading(false)
                console.log("LLegan datos",)

                setDataGrid(dataPetition.result.data)
                // setDataGrid([
                //     {
                //         id: "123",
                //         date_made: `${new Date()}`,
                //         id_suite: 1,
                //         date_init: `${new Date()}`,
                //         date_end: `${new Date()}`,
                //         total_amount: "25000$",
                //         total_days: 5,
                //     }
                // ])
                break;
            default: break;
        }
    }, [dataPetition])

    return (
        <div className='container'>

            <Row className='mt-5 mx-5'>
                
                <Col md="8">
                    <CardWithShadow
                        md="12"
                        className='p-5 '
                    >
                        <DataTable
                            title="Reservations"
                            onRowClicked={item => console.log(item)}
                            onRowDoubleClicked={item => console.log(item)}
                            progressPending={gridDataLoading}
                            progressComponent={<LoadingTableData />}
                            columns={columnsGrid}
                            data={dataGrid}
                            pagination
                        />


                    </CardWithShadow>


                </Col>

                <Col md="4">
                    {/* <h3 className='text-center'>You can see here all reservations what you maked!</h3> */}
                    <img 
                    src="/imgReservationsUser.webp" 
                    alt="" 
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "1%",
                    }}
                    />

                </Col>

            </Row>

        </div>
    )
}


/*
const TableReservations = ({
    data
}) => {

    return (<Table>

        <thead>
            <TableReservationsHeader />
        </thead>

        <tbody>
            <TableReservationsData data={data} />
        </tbody>



        <tbody>

        </tbody>
    </Table>)
}Ñ


const TableReservationsHeader = ({

}) => {


    return (

        <>
            <tr>
                <th>#Reservation</th>
                <th>Fecha de Reservación</th>
                <th>Suite</th>
                <th>Fecha Desde</th>
                <th>Fecha Hasta</th>
                <th>Total de días</th>
            </tr>
        </>
    )
}

const TableReservationsData = ({
    data = []
}) => {

    return (
        <>
            {
                !data[0] ? (
                    <tr>
                        <td scope="row" colspan={10} style={{ textAlign: "center" }}> No hay data que mostrar</td>
                    </tr>
                ) :
                    data.map(item => <TableReservationsDataReg />)
            }
        </>
    )
}

const TableReservationsDataReg = ({
    onClick = () => console.error("onClick no esta definido"),
    ondbClick = () => console.error("ondbClick no esta definido"),
    item
}) => {

    const {
        id,
        id_user,
        id_suite,
        date_init,
        date_end,
        date_made,
        totalamount,
        total_days
    } = item

    return (
        <tr
            onClick={() => onClick(item)}
            ondbClick={() => ondbClick(item)}
        >
            <th scope="row">{id}</th>
            <td>{date_made}</td>
            <td>{id_suite}</td>
            <td>{date_init}</td>
            <td>{date_end}</td>
            <td>{totalamount}</td>
            <td>{total_days}</td>

        </tr>
    )
}
*/