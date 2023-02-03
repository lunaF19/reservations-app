import { useEffect, useRef, useState } from "react"
import dbReservations from "../../api/dbReservations"
import { typesPetitions as tpRequests } from ".."
import notify from "../utils/notify"

export const usePetitions = () => {

    const initial_petition = {
        result: {

        },
        error: {
            errCode: 0,
            errMessage: "",
            message: ""
        }
    }

    const [indicatorPetition, setIndicatorPetition] = useState('NA')
    const [dataPetition, setDataPetition] = useState(initial_petition)
    const [petition, setPetition] = useState(initial_petition)
    const [isLoading, setIsLoading] = useState(false)
    const notifyRef = useRef(null)

    const [textNotify, setTextNotify] = useState(null)

    const manageNotify = (typeNotify, message) => {
        switch (typeNotify) {
            case "S":
                notify.promiseStar(notifyRef, message); break;
            case "ES":
                notify.promiseEnd.success(notifyRef, message);
                setIsLoading(false);
                break;
            case "EW":
                notify.promiseEnd.warning(notifyRef, message);
                setIsLoading(false);
                break;
            case "EE":
                notify.promiseEnd.error(notifyRef, message);
                setIsLoading(false);
                break;
            default:
                break;
        }
    }

    // Se pasa la data para poder manipularla
    const managePetitionData = data => {
        console.log("LLegan datos de la petición.data ***", data.data.result)
        setIsLoading(false)

        /*
         error: { errCode: 0, errMessage: "", message: "" }
        */

        if (data.data) {
            const { errCode = 0, errMessage = "",
                message = "" } = data.data?.error || {}

            if (errCode || errMessage) {
                console.error({ errCode, errMessage })
                manageNotify("EE", `${errCode} - ${errMessage || message}`)
                
            } else {
                console.log( " data ********", data.data)
                manageNotify("ES", data.data.message || message)
                switch (indicatorPetition) {
                    case tpRequests.getSuitesCategories:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.getSuitesCategoriesById:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.getUserData:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.updateUserData:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.getSuites:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.updateUserImage:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.getReservationsByUser:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    case tpRequests.insertReservations:
                        setDataPetition({ ...data.data, indicatorPetition })
                        break;
                    default: break;
                }
            }

        }

        setIndicatorPetition('NA')

    }

    useEffect(() => {

        if (indicatorPetition !== 'NA' && !isLoading) {
           // console.log("Se cambía el indicador.", indicatorPetition)
            setIsLoading(true)
            manageNotify("S", textNotify || "Wait...")
            switch (indicatorPetition) {
                case tpRequests.getSuitesCategories:
                    dbReservations.get('/suites_categories', { ...petition }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;
                    
                case tpRequests.getSuitesCategoriesById:
                    dbReservations.get(`/suites_categories/${petition.id}`, { ...petition }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;
                    
                case tpRequests.getSuites:
                    dbReservations.get(`/suites?${(new URLSearchParams(petition).toString())}`).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;
                    
                case tpRequests.getUserData:
                    dbReservations.get('/users', { ...petition }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;
                    
                case tpRequests.updateUserData:
                    dbReservations.post('/users', { ...petition }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;

                case tpRequests.updateUserImage:
                    const formData = new FormData();
                    formData.append("", petition)
                    dbReservations.post('/users/profileimage', formData, { headers: { "Content-Type": "multipart/form-data" } }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;
                case tpRequests.getReservationsByUser:

                    dbReservations.get('/reservations', { ...petition }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        managePetitionData(err.response)
                    })
                    break;
                case tpRequests.insertReservations:

                    dbReservations.post('/reservations', { ...petition }).then(res => {
                        managePetitionData(res)
                    }).catch(err => {
                        console.log(err)
                        managePetitionData(err.response)
                    })
                    break;
                default: break;
            }
        }
        setIndicatorPetition('NA')

    }, [indicatorPetition])

    return {
        indicatorPetition,
        setIndicatorPetition,
        setPetition,
        setTextNotify,

        isLoading,

        //Datos Retorno
        dataPetition,

    }

}