import { useEffect, useRef, useState } from "react"
import dbReservations from "../../api/dbReservations"
import notify from "../../UI/utils/notify"
import { typesPetitionsAdm as tpRequestsAdm } from "../types/typesPetitionsAdm"


export const usePetitionsAdm = () => {

    const initial_petition = {
        result: {

        },
        error: {
            errCode: 0,
            errMessage: "",
            message: ""
        }
    }

    const [indicatorPetitionAdm, setIndicatorPetitionAdm] = useState('NA')
    const [dataPetitionAdm, setDataPetitionAdm] = useState(initial_petition)
    const [petitionAdm, setPetitionAdm] = useState(initial_petition)
    const [isLoadingAdm, setIsLoadingAdm] = useState(false)
    const notifyRef = useRef(null)


    const [textNotify, setTextNotify] = useState(null)

    const manageNotifyAdm = (typeNotify, message) => {
        switch (typeNotify) {
            case "S":
                notify.promiseStar(notifyRef, message); break;
            case "ES":
                notify.promiseEnd.success(notifyRef, message);
                setIsLoadingAdm(false);
                break;
            case "EW":
                notify.promiseEnd.warning(notifyRef, message);
                setIsLoadingAdm(false);
                break;
            case "EE":
                notify.promiseEnd.error(notifyRef, message);
                setIsLoadingAdm(false);
                break;
            default:
                break;
        }
    }

    // Se pasa la data para poder manipularla
    const managePetitionDataAdm = data => {
        console.log("LLegan datos de la petición.data ***", data, indicatorPetitionAdm)
        setIsLoadingAdm(false)
        /*
         error: { errCode: 0, errMessage: "", message: "" }
        */

        if (data.data) {
            const { errCode = 0, errMessage = "",
                message = "" } = data.data?.error || {}

            if (errCode || errMessage) {
                console.error({ errCode, errMessage })
                manageNotifyAdm("EE", `${errCode} - ${errMessage || message}`)

            } else {
                manageNotifyAdm("ES", data.data.message || message)
                switch (indicatorPetitionAdm) {
                    case tpRequestsAdm.getSuitesAdm:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.updateSuitesAdm:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.getSuitesCategoriesAdm:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.updateSuitesCategoriesAdm:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.getCatalogs:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.updateCatalogs:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.getCatalogMediaData:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.updataCatalogMedia:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    case tpRequestsAdm.deleteCatalogMedia:
                        setDataPetitionAdm({ ...data.data, indicatorPetitionAdm })
                        break;
                    default: break;
                }
            }

        }

        setIndicatorPetitionAdm('NA')

    }

    useEffect(() => {

        if (indicatorPetitionAdm !== 'NA' && !isLoadingAdm) {
            //console.log("Se cambía el indicador.", indicatorPetitionAdm)
            setIsLoadingAdm(true)
            manageNotifyAdm("S", textNotify || "Wait...")
            switch (indicatorPetitionAdm) {
                case tpRequestsAdm.getSuitesAdm:
                    dbReservations.get('/adm/suites', { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)
                    })
                    break;
                case tpRequestsAdm.updateSuitesAdm:
                    dbReservations.post('/adm/suites', { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)
                    })
                    break;
                case tpRequestsAdm.getSuitesCategoriesAdm:
                    dbReservations.get('/adm/suites/categories', { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)

                    })
                    break;
                case tpRequestsAdm.updateSuitesCategoriesAdm:
                    dbReservations.post('/adm/suites/categories', { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)
                    })
                    break;
                case tpRequestsAdm.getCatalogs:
                    dbReservations.get('/adm/catalogs', { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)

                    })
                    break;
                case tpRequestsAdm.updateCatalogs:
                    dbReservations.post('/adm/catalogs', { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)
                    })

                    break;
                case tpRequestsAdm.getCatalogMediaData:
                    dbReservations.get(`/adm/catalog_media/${petitionAdm.id}`, { ...petitionAdm }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)

                    })
                    break;
                case tpRequestsAdm.updataCatalogMedia:
                    const { id, num_order, dml, file } = petitionAdm
                    const headers = {
                        "Content-Type": "multipart/form-data",
                        id,
                        num_order,
                        dml
                    }

                    dbReservations.post(`/adm/catalog_media/`, file, { headers }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)

                    })
                    break;

                case tpRequestsAdm.deleteCatalogMedia:
                    dbReservations.delete(`/adm/catalog_media/${petitionAdm.id}/${petitionAdm.num_order}`, { ...petitionAdm }, { body: { ...petitionAdm } }).then(res => {
                        managePetitionDataAdm(res)
                    }).catch(err => {
                        managePetitionDataAdm(err.response)

                    })
                    break;
                default:
            }
        }
        setIndicatorPetitionAdm('NA')

    }, [indicatorPetitionAdm])

    return {
        indicatorPetitionAdm,
        setIndicatorPetitionAdm,
        setPetitionAdm,
        setTextNotify,

        isLoadingAdm,

        //Datos Retorno
        dataPetitionAdm,

    }

}