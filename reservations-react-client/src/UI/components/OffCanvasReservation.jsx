import { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'reactstrap';
import {  useFormReservations } from '../hooks';
import { FormReservation } from './FormReservation';

export const OffCanvasReservation = ({
  //Data 
  data,
  show,
  setShow,
}) => {

  const {
    numSuite,
    setNumSuite,
    // Data of recuparated suites
    dataSuites,
    setIdCategory,
    //
    setListenerOnChangeDate,
    isLoadingForm,
    // setIsLoadingForm,

    totalAmount,
    totalDays,

    isValidInfo,

    setDateRange,
    dateRange,
    makeReservations
  } = useFormReservations()

  useEffect(() => {
    setIdCategory(data.id)
    setListenerOnChangeDate(true)
  }, [data])
  
  useEffect(() => {
    setListenerOnChangeDate(show)
  }, [show])


  return (
    <>

      <Offcanvas show={show} onHide={() => { setShow(false) }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{data.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <FormReservation
            isValidInfo={isValidInfo}
            {...data}
            isLoading={isLoadingForm}
            dateRange={dateRange}
            setDateRange={setDateRange}

            numSuite={numSuite}
            setNumSuite={setNumSuite}

            dataSuites={dataSuites}

            totalAmount={totalAmount}
            totalDays={totalDays}

          />
          
          {
            isValidInfo && (
              <Button
                disabled={isLoadingForm}
                color='secondary'
                outline
                block
                onClick={makeReservations}
              >
                Make a reservation

              </Button>
            )
          }

          {/* {JSON.stringify(data)} */}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}