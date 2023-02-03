import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";


export const useFilterSearchSuite = (_originalData = []) => {

    const timeLoadRef = useRef(0)
    const [originalData, setOriginalData] = useState(_originalData)

    const [searchParams, setSearchParams] = useSearchParams()

    const [rangeOfPrice, setRangeOfPrice] = useState([0, 1])

    const initalFormValues = {
        typeFilter: searchParams.get("typeFilter") || "textFilter",
        textFilter: searchParams.get("textFilter") || "",
        number1: parseInt(searchParams.get("number1")) || 0,
        number2: parseInt(searchParams.get("number2")) || 0
    }
    const [formValues, setFormValues] = useState(initalFormValues)

    const handleInputChangeFormValues = ({ target: { value, name } }) => {
        setFormValues(prev => ({ ...prev, [name]: value, }))
    }

    const {
        typeFilter,
        textFilter,
        number1,
        number2,
    } = formValues

    const typesOfFilters = {
        textFilter: "text",
        priceFilter: "number",
    }
    const placeholderByFilter = {
        textFilter: "What´s search?",
        priceFilter: "Introduce Price",
    }

    const listOfFilters = [
        { label: "Text", value: "textFilter" },
        { label: "Price", value: "priceFilter" },
    ]

    const hadleOnSubmitFormValues = async (e) => {
        e.preventDefault()
        setSearchParams(formValues)
        return;
    };

    const filteredData = useMemo(() => {
        let data = []
        switch (typeFilter) {
            case "textFilter": // Se filtra por el texto
                if (!textFilter) data = originalData
                else data = originalData.filter(({ name, description }) => name.toLowerCase().includes(textFilter.toLowerCase()) || description.toLowerCase().includes(textFilter.toLowerCase()))
                break;
            case "priceFilter": // Se filtra por el rango de precio
                if (number1 === 0 && number2 === 0) data = originalData;
                else data = originalData.filter(({ price }) => price >= number1 && price <= number2)
                break;
            default: data = originalData; break;
        }
        return data
    }, [originalData, typeFilter, textFilter, number1, number2])


    const filterIsNumber = typesOfFilters[formValues.typeFilter] === "number"

    useEffect(() => {
        if (originalData.length > 1) {
            const prices = originalData.map(item => item.price).sort((a, b) => parseInt(a) - parseInt(b))
            const maxRange = prices.at(-1)
            const minRange = prices.at(0)
            setFormValues(prev => ({
                ...prev,
                number1: minRange,
                number2: maxRange,
            }))
            setRangeOfPrice([minRange, maxRange])
        } else {
            setRangeOfPrice([0, 1])
        }
    }, [originalData])

    useEffect(() => {
        if (timeLoadRef.current === 0) {
            timeLoadRef.current++
        } else {
            const prevFromValues = formValues

            const timeOut = setTimeout(() => {

                if (
                    filteredData.length &&
                    (prevFromValues.textFilter === formValues.textFilter ||
                        prevFromValues.number2 === formValues.number2 ||
                        prevFromValues.number1 === formValues.number1)
                ) setSearchParams(formValues)


            }, 3000);
            return () => clearTimeout(timeOut)
        }

    }, [formValues])

    return {
        listOfFilters,
        placeholderByFilter,

        rangeOfPrice,

        setOriginalData,

        filterIsNumber,
        filteredData,

        formValues,

        hadleOnSubmitFormValues,
        handleInputChangeFormValues
    }
}