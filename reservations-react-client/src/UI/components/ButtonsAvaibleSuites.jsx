import { fontSize, width } from "@mui/system"
import React, { useId } from "react"
import { Button } from "reactstrap"
import { LoadingTableData } from "./LoadingTableData"

export const ButtonsAvaibleSuites = ({
    isLoading,
    dataSuites = [],
    setNumSuite,
    numSuite,
    
}) => {


    return (

        <>

            <div
                className={`${isLoading ? `disabled-element` : ``} mt-2`}
                style={{
                    display: 'flex',
                    alignItems: `center`,
                    margin: '.4rem 1rem',
                    padding: '0 1rem'
                }}

            >
                {
                    isLoading ?  <LoadingTableData />
                    : dataSuites[0]
                        ? <ShowBtns
                            dataSuites={dataSuites}
                            setNumSuite={setNumSuite}
                            numSuite={numSuite} />
                        : <span
                            style={{
                                display: `block`,
                                fontSize: '1.25rem',
                                width: '100%'
                            }}

                        >Select a valid range date for see the suites.</span>
                }

            </div>
        </>
    )
}


const ShowBtns = ({
    dataSuites,
    setNumSuite,
    numSuite
}) => {
    const idBtns = useId()

    return (
        <>
            <span
                style={{
                    display: `block`,
                    fontSize: '1.25rem',
                    width: '30%'
                }}

            >Select a suite:</span>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '60%',

                }}

            >

                {
                    dataSuites.map(item => (

                        <ButtonSuite
                            key={`${idBtns}_${item.id}`}

                            setNumSuite={setNumSuite}
                            numSuite={numSuite}
                            idSuite={item.id}
                        />
                    ))
                }
            </div>
        </>

    )
}

const ButtonSuite = ({
    setNumSuite,
    numSuite,
    idSuite,

}) => {
    return (
        <Button
            style={{
                margin: '0 auto'

            }}
            outline={numSuite !== idSuite}
            color="primary"
            onClick={e => setNumSuite(prev => prev === idSuite ? null : idSuite)}
            className="rounded-circle"
        >
            {idSuite}
        </Button>
    )
}