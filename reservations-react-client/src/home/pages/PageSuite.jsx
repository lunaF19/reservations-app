import React, { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom';

import { Button, Card,  CardText, CardTitle, Col, Row, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import { CornerDownLeft, Clipboard } from 'react-feather'
import { IoReturnDownBack } from 'react-icons/io5'
import { FaWpforms } from 'react-icons/fa'

import { CarruselImagesSuite } from "../"
import clipboard from '../../UI/utils/clipboard'
import notify from '../../UI/utils/notify'
import { typesPetitions, usePetitions, FormReservation, useFormReservations } from '../../UI';

export const PageSuite = () => {
    
    const [data, setData] = useState({})
    const [images, setImages] = useState([])

    const [showReservationForm, setShowReservationForm] = useState(false)

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

    const {
        // indicatorPetition,
        setIndicatorPetition,
        setPetition,
        //isLoading,
        //Datos Retorno
        dataPetition } = usePetitions()

    const navigate = useNavigate()
    //const location = useLocation()

    const { id } = useParams();

    
    useEffect(() => {
        setListenerOnChangeDate(true)
        setIdCategory(id)
        setPetition({ id })
        setIndicatorPetition(typesPetitions.getSuitesCategoriesById)
    }, [])


    useEffect( ()=> {
        setListenerOnChangeDate(showReservationForm)
    }, [showReservationForm])

    useEffect(() => {
        switch (dataPetition.indicatorPetition) {
            case typesPetitions.getSuitesCategoriesById:
                if (dataPetition.result?.data[0]) {
                    setData(dataPetition.result.data[0])
                }
                if (dataPetition.result?.dataFiles) {
                    const dataImage = dataPetition.result.dataFiles.map(item => ({ ...item, url: item.url_media }))
                    setImages(dataImage)
                }
                break;
                
            default: break;
        }

    }, [dataPetition])

    return (
        <>

            <Row className='mx-5 mb-5'>

                <Col md="8 mt-5" >

                    <Card className='shadow-lg' >

                        <Row className='mb-3 bg-secondary rounded-top m-0 p-2'>

                            <Col md={4}>
                                <Button
                                    className=''
                                    onClick={() => navigate(-1)} >
                                    <CornerDownLeft />
                                    Go forward
                                </Button>
                            </Col>

                            <Col md={8} className='text-light fw-bold text-left'>

                                <RouteSuite navigate={navigate} />

                            </Col>

                        </Row>

                        <Row>
                            <Col md={12}
                                className="mb-3 animate__animated animate__zoomIn "
                                style={{
                                    height: "100%"
                                }}
                            >
                                <CarruselImagesSuite
                                    img={images}
                                />
                            </Col>
                        </Row>

                    </Card>

                </Col>


                <Col md={4}
                    className="animate__animated animate__fadeInDown mt-5"

                >

                    <>
                        <Row className='mb-5'>
                            {
                                showReservationForm
                                    ?  <FormReservation
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
                                    : <InfoSuite {...data} />
                            }
                        </Row>

                        <Row className=''
                            style={{
                                position: `absolute`,
                                bottom: `0px`,
                                width: '100%',
                            }}
                        >

                            <Button
                                className='my-2'
                                style={{
                                    marginLeft: '2%',
                                    width: `${(showReservationForm && isValidInfo) ? '30%' : '100%'} `
                                }}
                                onClick={e => setShowReservationForm(prev => !prev)}
                            >
                                {
                                    showReservationForm
                                        ? (<> Show info <IoReturnDownBack size="30px" /></>)
                                        : <>Show form reservation <FaWpforms size="30px" /></>
                                }

                            </Button>

                            {(showReservationForm && isValidInfo) &&
                                (<Button
                                    color="secondary"
                                    outline
                                    className='my-2'
                                    style={{
                                        marginLeft: '5%',
                                        width: `61%`
                                    }}
                                    onClick={makeReservations}>
                                    You´re Sure? Then Make Reservation!

                                </Button>
                                )
                            }


                        </Row>


                    </>

                </Col>

            </Row>


        </>

    )
}


const InfoSuite = ({ name, description, price }) => {

    return (
        <>
            <CardTitle tag="h3">
                {name}
            </CardTitle>
            <CardText>
                {description}

            </CardText>
        </>
    )

}


const RouteSuite = ({ navigate }) => {


    const copyLink = () => {
        const data = window.location.href;
        if (clipboard.copy(data)) notify.info("Se copió")
        else notify.info("no se copió")
    }

    return (
        <>
            <Breadcrumb className='mt-1' color="">

                <BreadcrumbItem
                    className='our-link'
                    onClick={() => navigate("/home")}
                >
                    Home
                </BreadcrumbItem>

                <BreadcrumbItem
                    className='our-link'
                    onClick={() => navigate("/home/suites")}
                >
                    Search Suites
                </BreadcrumbItem>

                <BreadcrumbItem
                    className='our-pointer fw-semibold'
                    onClick={copyLink}
                >
                    This is a category  <Clipboard size={20} />
                </BreadcrumbItem>

            </Breadcrumb >
        </>
    )
}

