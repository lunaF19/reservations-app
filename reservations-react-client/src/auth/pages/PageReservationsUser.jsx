import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";

import DataTable from "react-data-table-component";

import { LoadingTableData, usePetitions } from "../../UI";
import { CardWithShadow } from "../../UI/components/CardWithShadow";

import { typesPetitions } from "../../UI";

import { columnsReservationsByUser } from "../types/columnsReservationsByUser";

export const PageReservationsUser = () => {
  const [dataGrid, setDataGrid] = useState([]);

  const [gridDataLoading, setGridDataLoading] = useState(false);

  const { setIndicatorPetition, dataPetition } = usePetitions();

  const columnsGrid = [...columnsReservationsByUser];

  useEffect(() => {
    setGridDataLoading(true);
    setTimeout(
      () => setIndicatorPetition(typesPetitions.getReservationsByUser),
      1000
    );
    return clearTimeout;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    switch (dataPetition.indicatorPetition) {
      case typesPetitions.getReservationsByUser:
        setGridDataLoading(false);
        console.log("LLegan datos");

        setDataGrid(dataPetition.result.data);
        break;
      default:
        break;
    }
  }, [dataPetition]);

  return (
    <div className="container">
      <Row className="mt-5 mx-5">
        <Col md="8">
          <CardWithShadow md="12" className="p-5 ">
            <DataTable
              title="Reservations"
              onRowClicked={(item) => console.log(item)}
              onRowDoubleClicked={(item) => console.log(item)}
              progressPending={gridDataLoading}
              progressComponent={<LoadingTableData />}
              columns={columnsGrid}
              data={dataGrid}
              pagination
            />
          </CardWithShadow>
        </Col>

        <Col md="4">
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
  );
};
