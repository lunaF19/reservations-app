import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { typesPetitions } from "../types"
import notify from "../utils/notify"
import { useDateRangePicker } from "./useDateRangePicker"
import { usePetitions } from "./usePetitions"

export const useFormReservations = () => {

    //    const isFirstTimeRef = useRef(0)
    const navigate = useNavigate()
    const [listenerOnChangeDate, setListenerOnChangeDate] = useState(false)
    const [idCategory, setIdCategory] = useState(null)

    const [numSuite, setNumSuite] = useState(null)

    const [dataSuites, setDataSuites] = useState([])
    const [totalDays, setTotalDays] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const [isLoadingForm, setIsLoadingForm] = useState(false)

    const { setDateRange, dateRange, extractParamsOfRages } = useDateRangePicker()

    const {
        // indicatorPetition,
        setIndicatorPetition,
        setPetition,
        //isLoading,
        //Datos Retorno
        dataPetition } = usePetitions()

    const isValidInfo = useMemo(() => {
        return dataSuites.map(item => item.id).includes(numSuite)
    }, [numSuite, dataSuites])


    const makeReservations = () => {

        if (isLoadingForm) return notify.warning("Se debe esperar...")

        let message = ""
        const user = JSON.parse(localStorage.getItem('user'))
        const { userId: id_user, completeInfo } = user || {}
        
        if (!isValidInfo) message = "La información ingresada no es valida!"
        if (!id_user) message = "No se encontró un usuario valido!"
        if (!numSuite || !dataSuites.find(item => item.id === numSuite)) message = "Se debe seleccionar una suite valida!"
        if (!dateRange.startDate
            || !dateRange.endDate
            //|| !isValidDate(dateRange.startDate, dateRange.endDate)
        ) message = "Se debe seleccionar una rango de fechas valido!"
        
        if(!completeInfo) message = "The user dont have a complete data."
        if (message) return notify.warning(message)

        const { //endDateParams, startDateParams,
            //diferenceBetweenDays, totalOfDays,
            date1, date2
        } = extractParamsOfRages()

        const reservation = {
            id_user,
            id_suite: numSuite,
            date_init: date1,
            date_end: date2,
            date_made: new Date(),
            total_amount: totalAmount,
            // total_days 
        }

        setIndicatorPetition(typesPetitions.insertReservations)
        setPetition({ reservation })

    }

    useEffect(() => {
        if (!listenerOnChangeDate) {
            return;
        } else {
            const date = dateRange;
            setIsLoadingForm(true)

            const timeOut = setTimeout(() => {
                if (
                    date.startDate === dateRange.startDate &&
                    date.endDate === dateRange.endDate
                ) {
                    const { //endDateParams, startDateParams,
                        //diferenceBetweenDays, totalOfDays,
                        date1, date2
                    } = extractParamsOfRages()

                    setPetition({ id_category: idCategory, date1, date2 })
                    setIndicatorPetition(typesPetitions.getSuites)
                    setDataSuites([])
                    setIsLoadingForm(true)
                    //notify.info("Se manda a hacer la petición.")
                } else setIsLoadingForm(false)
            }, 2000);

            return () => clearTimeout(timeOut);
        }

    }, [dateRange]);


    useEffect(() => {
        switch (dataPetition.indicatorPetition) {
            case typesPetitions.getSuites:
                setIsLoadingForm(false)
                if (dataPetition.result?.error?.errCode) {

                } else {
                    if (dataPetition.result?.data[0]) {
                        setDataSuites(dataPetition.result.data)
                        setTotalDays(dataPetition.result.total_days)
                        setTotalAmount(dataPetition.result.total_amount)
                    } else notify.info("selecciona otra fecha.")
                }

                break;
            case typesPetitions.insertReservations:

                setIsLoadingForm(false)
                if (dataPetition.result?.error?.errCode) {

                } else {
                    navigate("/dashboard/reservationsUser")
                }

                break;
            default: break;
        }

    }, [dataPetition])


    return {
        // Set and get numSuite
        numSuite,
        setNumSuite,
        // Data of recuparated suites
        dataSuites,
        setDataSuites,
        makeReservations,
        //
        isValidInfo,
        totalAmount,
        totalDays,

        isLoadingForm,
        setIsLoadingForm,
        setListenerOnChangeDate,

        setDateRange,
        dateRange,
        extractParamsOfRages,
        setIdCategory
    }
}