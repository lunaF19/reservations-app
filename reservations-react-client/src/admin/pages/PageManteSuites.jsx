import React, { useEffect, useRef, useState } from 'react'
import { Card, CardImg, CardFooter, CardText, Col, Row, FormGroup, Label, Input, Button, Table, Form } from 'reactstrap'


import { CardWithShadow } from '../../UI/components/CardWithShadow'

import { FkModal, LoadingTableData, useForm } from '../../UI';
import notify from '../../UI/utils/notify';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { columnsCategoryModalManteSuites, columnsManteSuites } from '../types/columnsTablesAdm';
import { usePetitionsAdm } from '../hooks/usePetitionsAdm';
import { typesPetitionsAdm } from '../types/typesPetitionsAdm';


export const PageManteSuites = () => {

    const [dataGrid, setDataGrid] = useState([])
    const [dataCategories, setDataCategories] = useState([])
    const [isLoadCategories, setIsLoadCategories] = useState(false)

    // Forms Ref
    const idSuiteFormRef = useRef(null)
    const idCategoryFormRef = useRef(null)

    // Data Filtering
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const [dml, setDml] = useState("I")
    const [gridDataLoading, setGridDataLoading] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const { setIndicatorPetitionAdm, setTextNotify, indicatorPetitionAdm, dataPetitionAdm, setPetitionAdm } = usePetitionsAdm()

    const { formValues, updateDataForm } = useForm({})

    const { id, id_category } = formValues

    const manageDmlInit = data => {
        let numSuite = 0
        if (!data[0]) {
            numSuite = 1
        } else {
            numSuite = data.map(item => item.id).sort().reverse()[0] + 1
        }
        document.getElementById("edit_suite_id_category").value = ""
        document.getElementById("edit_suite_id").value = ""
        //idSuiteFormRef.current.value = ""
        //idCategoryFormRef.current.value = ""
        updateDataForm({ id: numSuite, })
        setDml("I")
    }

    const updateGridData = () => {
        const dataGridTemp = dataGrid;
        let newData

        if (dataGridTemp.find(item => item.id === id)) {
            newData = dataGridTemp.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        ...formValues
                    }
                }
                return item
            })
        } else { // Se debe agregar
            newData = [formValues, ...dataGrid,]
        }
        setDml("U")
        setDataGrid(newData)
        manageDmlInit(newData)
    }


    const manageCategory = item => {
        if (item.id) {
            formValues.id_category = item.id
        }
        setShowModal(false)
    }

    const showCategories = () => {
        if (isLoadCategories) {
            notify.info("Esperar... Se ha mandado a pedir los datos de categorias.")
            return;
        }

        if (dataCategories[0]) {
            setShowModal(true)
        } else {
            notify.warning("No se han obtenido datos de categorías.")
        }

    }

    const updateSuites = e => {
        e.preventDefault()
        if (!id || !id_category) {
            notify.warning("Faltan datos para actualizar!")
            return;
        }
        setPetitionAdm(prev => ({ ...prev, dml, suite: { id, id_category } }))
        setIndicatorPetitionAdm(typesPetitionsAdm.updateSuitesAdm)
    }

    const updateFormData = item => {
        updateDataForm(item);
        setDml("U")
    }

    const addNewSuite = () => manageDmlInit(dataGrid)

    const columnsGrid = [...columnsManteSuites]

    const filteredItems = dataGrid.filter(item => item.id_category && item.id_category.toLowerCase().includes(filterText.toLowerCase()),);
    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent
                handleClear={handleClear}
                onFilter={e => setFilterText(e.target.value)}
                filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    useEffect(() => {
        setGridDataLoading(true)
        const timeOut = setTimeout(() => setIndicatorPetitionAdm(typesPetitionsAdm.getSuitesAdm), 1000)
        return () => clearTimeout(timeOut)
    }, [])

    useEffect(() => {
        switch (dataPetitionAdm.indicatorPetitionAdm) {
            case typesPetitionsAdm.getSuitesAdm:
                setGridDataLoading(false)
                if (dataPetitionAdm.result?.data) {
                    setDataGrid(dataPetitionAdm.result.data)
                    manageDmlInit(dataPetitionAdm.result.data)
                }
                if (dataCategories.length === 0 && !isLoadCategories) {
                    setIsLoadCategories(true)
                    setIndicatorPetitionAdm(typesPetitionsAdm.getSuitesCategoriesAdm)
                }
                break;
            case typesPetitionsAdm.getSuitesCategoriesAdm:
                setIsLoadCategories(false)
                if (dataPetitionAdm.result?.data) {
                    setDataCategories(dataPetitionAdm.result.data)
                }
                break;
            case typesPetitionsAdm.updateSuitesAdm:
                updateGridData();
                break;
            default: break;
        }
    }, [dataPetitionAdm])

    return (
        <>
            {showModal &&
                <FkModal
                    title="Select a category:"
                    setShowModal={setShowModal}
                    showModal={showModal}
                    columnsGridFk={columnsCategoryModalManteSuites}
                    dataGridFk={dataCategories}

                    onClick={manageCategory}
                />
            }


            <div className='container'>

                <Row className='mt-5'>

                    <Col md="8" >
                        <DataTable
                            title="Mantenimiento Suites"
                            onRowClicked={item => updateFormData(item)}
                            onRowDoubleClicked={item => updateFormData(item)}
                            progressPending={gridDataLoading}
                            progressComponent={<LoadingTableData />}
                            columns={columnsGrid}
                            data={filteredItems}
                            subHeaderComponent={subHeaderComponentMemo}

                            pagination
                        />
                    </Col>

                    <Col md="4">
                        <CardWithShadow 
                        md="12"
                        className='mb-5 p-5 mt-5 rounded-3'
                        >
                            <FormEditSuite
                                idSuiteFormRef={idSuiteFormRef}
                                idCategoryFormRef={idCategoryFormRef}
                                addNewSuite={addNewSuite}
                                showCategories={showCategories}
                                dataEdit={formValues}
                                updateData={updateSuites}
                                dml={dml}
                            />
                        </CardWithShadow>
                    </Col>

                </Row>

            </div>

        </>
    )
}



const FormEditSuite = ({
    idCategoryFormRef,
    idSuiteFormRef,

    showCategories,
    dml,
    dataEdit,
    updateData,
    addNewSuite,
}) => {

    const {
        id,
        id_category
    } = dataEdit

    return (

        <Form onSubmit={updateData}>
            <Button
                block
                color="secondary"
                onClick={addNewSuite}
            >
                Add new suite
            </Button>

            <Row>

                <FormGroup tag={Col} md="4">
                    <Label for="id">#Suite</Label>
                    <Input
                        ref={idSuiteFormRef}
                        disabled={true}
                        type="number"
                        id="edit_suite_id"
                        name="id"
                        value={id}
                    />
                </FormGroup>

                <FormGroup tag={Col} md="8" onClick={showCategories}>
                    <Label for="id_category">Category</Label>
                    <Input
                        ref={idCategoryFormRef}
                        disabled={true}
                        type="text"
                        id="edit_suite_id_category"
                        name="id_category"
                        value={id_category}
                    />
                </FormGroup>

            </Row>

            <Row>
                <Col md="8" onClick={
                    e => {
                        console.log(idCategoryFormRef.current)
                        console.log(idSuiteFormRef.current)

                        document.getElementById("id_category").target.value ="adasd"
                        //idCategoryFormRef.current.target.value ="adasd"
                    }
                }>

                </Col>

                <Col md="4" className=''>
                    <Button
                            block
                        color="primary"
                        type="submit"
                        className=''
                    >
                        {dml === "U" && "Update"}
                        {dml === "I" && "Add"}
                    </Button>
                </Col>
            </Row>


        </Form>
    )
}



const FilterComponent = ({
    handleClear,
    onFilter,
    filterText,
}) => {
    return (
        <>
            <Button onClick={handleClear}>
                X
            </Button>

            <Input
                type='text'
                onChange={onFilter}
                value={filterText}
            />
        </>
    )
}