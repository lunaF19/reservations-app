import React, { useEffect, useState, useContext } from "react";

import { Card, CardTitle, CardImg, CardText, CardBody, CardHeader, Row, Col, Button, CardFooter } from "reactstrap"

import { useNavigate } from "react-router-dom"

import { usePetitions, typesPetitions, OffCanvasReservation, useFilterSearchSuite, FilterSerch } from "../../UI";
import { AuthContext } from "../../auth";
import notify from "../../UI/utils/notify";
import { CardWithShadow } from "../../UI/components/CardWithShadow";


export const PageSuites = () => {

  const [data, setData] = useState([])

  const { logged: isLogged = false, completeInfo: isCompleteInfo } = useContext(AuthContext);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [indexOffCanvas, setIndexOffCanvas] = useState(null)

  const hoockFilterSearch = useFilterSearchSuite()
  const { filteredData, setOriginalData } = hoockFilterSearch

  const {
    //  indicatorPetition,
    setIndicatorPetition,
    //  setPetition,
    //  isLoading,
    //Datos Retorno
    dataPetition } = usePetitions()


  useEffect(() => {
    setIndicatorPetition(typesPetitions.getSuitesCategories)
  }, [])

  useEffect(() => {
    switch (dataPetition.indicatorPetition) {
      case typesPetitions.getSuitesCategories:
        if (dataPetition.result.data) {
          setData(dataPetition.result.data)
        }
        break;
      default: break;
    }

  }, [dataPetition])


  useEffect(() => {
    setOriginalData(data)
  }, [data])

  return (
    <>

      {
        showOffCanvas && indexOffCanvas !== null && (
          <OffCanvasReservation
            data={data[indexOffCanvas]}
            setShow={setShowOffCanvas}
            show={showOffCanvas}

          />
        )
      }

      <CardWithShadow md={11} className="mb-5 p-5 mt-5 mx-5 my-3">

        <CardHeader className="mx-4 my-3">

          <FilterSerch {...hoockFilterSearch} />

        </CardHeader>

        <CardBody className="">


          <Row>

            {
              filteredData.map((item, index) => (
                <CardInfoSuite
                  key={item.id}
                  {...item}
                  index={index}
                  isLogged={isLogged}
                  isCompleteInfo={isCompleteInfo}
                  setIndexOffCanvas={setIndexOffCanvas}
                  setShowOffCanvas={setShowOffCanvas}
                  link={`/home/suite/${item.id}`}
                />
              ))
            }

          </Row>

        </CardBody>


      </CardWithShadow>
    </>
  );
};



const CardInfoSuite = ({
  // Data for card
  id,
  name,
  description,
  price,
  url_media,
  coinPrice = "$",

  link,

  isCompleteInfo,
  isLogged,
  // Data of off Canvas
  setShowOffCanvas,
  setIndexOffCanvas,
  index,


}) => {


  const showOffCanvas = () => {
    if (!isLogged) {
      notify.warning("Debes estar loggeado para hacer la reservación.")
      return;
    }

    if (!isCompleteInfo ) {
      notify.warning("Debes estar completar la información para poder hacer la reservación.")
      return;
    }
    setIndexOffCanvas(index)
    setShowOffCanvas(true)
  }

  const getDescription = () => {
    if (description.length < 100) return description
    return description.substr(0, 97) + "..."
  }

  const navigate = useNavigate()

  return (
    <Col
      md={3}
    >

      <Card
        className={`p-2 bg-light border my-2 animate__animated animate__backInLeft`} >
        <CardImg
          onClick={() => navigate(link)}
          className="our-pointer"
          alt="Card image cap"
          bottom
          src={url_media}
          style={{ height: 180 }}
        />

        <CardBody
          onClick={() => navigate(link)}
          className="our-pointer"
        >
          <CardTitle tag="h3">
            {name}
          </CardTitle>
          <CardText>
            {getDescription()}
          </CardText>
        </CardBody>

        <CardFooter>
          <Row>
            <Button color={"warning"}
              onClick={showOffCanvas}>
              <CardText className="text-center">
                <span className="fs-5 ">
                  Make Reservation!
                </span>
                <br />
                <span className="fs-6 fw-bold">
                  {coinPrice} {price}
                </span>
                <span className="fs-6 fst-italic">
                  / day
                </span>
              </CardText>
            </Button>
          </Row>
        </CardFooter>
      </Card>
    </Col>
  )
}

