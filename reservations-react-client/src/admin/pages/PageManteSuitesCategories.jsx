import React, { useEffect, useState } from 'react'
import { Card, CardImg, CardFooter, CardText, Col, Row, FormGroup, Label, Input, Button, Table, Form } from 'reactstrap'


import { CardWithShadow } from '../../UI/components/CardWithShadow'

import Select from "react-select"
import { FkModal, LoadingTableData, useForm } from '../../UI';
import notify from '../../UI/utils/notify';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { columnsManteSuitesCategories } from '../types/columnsTablesAdm';
import { usePetitionsAdm } from '../hooks/usePetitionsAdm';
import { typesPetitionsAdm } from '../types/typesPetitionsAdm';


export const PageManteSuitesCategories = () => {

    const [dataGrid, setDataGrid] = useState([])

    const [dml, setDml] = useState("I")
    const [gridDataLoading, setGridDataLoading] = useState(false)

    const [listDataCatalogs, setListDataCatalogs] = useState([])
    const { setIndicatorPetitionAdm, setTextNotify, indicatorPetitionAdm, dataPetitionAdm, setPetitionAdm } = usePetitionsAdm()

    const { formValues, updateDataForm, handleInputChange } = useForm({})

    const { id, name, description, price, id_catalog_media } = formValues

    const resetForm = () => {
        updateDataForm({})
        const $ = a => document.getElementById(a)
        $("edit_category_description").value = ""
        $("edit_category_price").value = ""
        $("edit_category_id").value = ""
        $("edit_category_name").value = ""
        $("edit_category_id_multimedia").value = ""
        setDml("I")
    }

    const manageDmlInit = data => {
        if (dml !== "U") {
            resetForm()
        }

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


    const updateSuitesCategories = e => {
        e.preventDefault()

        if (!id || !name || !description || !price || !id_catalog_media) {
            notify.warning("Faltan datos para actualizar!")
            return;
        }

        setPetitionAdm(prev => ({ ...prev, dml, suite_category: { id, name, description, price, id_catalog_media } }))
        setIndicatorPetitionAdm(typesPetitionsAdm.updateSuitesCategoriesAdm)
    }

    const updateFormData = item => {
        updateDataForm(item);
        setDml("U")
    }

    const addNewSuiteCategory = () => resetForm();

    const columnsGrid = [...columnsManteSuitesCategories]

    useEffect(() => {
        setGridDataLoading(true)
        setTimeout(() => setIndicatorPetitionAdm(typesPetitionsAdm.getSuitesCategoriesAdm), 1000)
        return clearTimeout
    }, [])

    useEffect(() => {
        switch (dataPetitionAdm.indicatorPetitionAdm) {
            case typesPetitionsAdm.getSuitesCategoriesAdm:
                setGridDataLoading(false)
                if (dataPetitionAdm.result?.data) {
                    setDataGrid(dataPetitionAdm.result.data)
                    manageDmlInit(dataPetitionAdm.result.data)
                    setIndicatorPetitionAdm(typesPetitionsAdm.getCatalogs)
                }
                break;
            case typesPetitionsAdm.getCatalogs:
                if (dataPetitionAdm.result?.data) {
                    console.log(dataPetitionAdm.result?.data)
                    const listCatalogs = dataPetitionAdm.result.data.map(item => ({ label: item.id, value: item.id }))
                    setListDataCatalogs(listCatalogs)
                }
                break;
            case typesPetitionsAdm.updateSuitesCategoriesAdm:
                updateGridData();
                break;
            default: break;
        }
    }, [dataPetitionAdm])

    return (
        <>
            <div className='container'>

                <Row className='mt-5'>

                    <Col md="6" >
                        <DataTable
                            title="Mantenimiento Categories Suites"
                            onRowClicked={item => updateFormData(item)}
                            onRowDoubleClicked={item => updateFormData(item)}
                            progressPending={gridDataLoading}
                            progressComponent={<LoadingTableData />}
                            columns={columnsGrid}
                            data={dataGrid}
                            pagination
                        />
                    </Col>

                    <Col md="6">
                        <CardWithShadow
                            md="12"
                            className='mb-5 p-5 mt-5 rounded-3'
                        >
                            <FormEditSuiteCategory
                                listDataCatalogs={listDataCatalogs}
                                handleInputChange={handleInputChange}
                                addNewSuiteCategory={addNewSuiteCategory}
                                dataEdit={formValues}
                                updateData={updateSuitesCategories}
                                dml={dml}
                            />
                        </CardWithShadow>
                    </Col>

                </Row>

            </div>

        </>
    )
}



const FormEditSuiteCategory = ({
    handleInputChange,
    showCategories,
    listDataCatalogs,
    dml,
    dataEdit,
    updateData,
    addNewSuiteCategory,
}) => {

    const {
        id,
        name,
        description,
        price,
        id_catalog_media
    } = dataEdit

    return (

        <Form onSubmit={updateData}>
            <Button
                block
                color="secondary"
                onClick={addNewSuiteCategory}
            >
                Add new suite category
            </Button>

            <Row>

                <FormGroup tag={Col} md="4">
                    <Label for="id">Id category</Label>
                    <Input
                        disabled={dml === "U"}
                        type="text"
                        id="edit_category_id"
                        name="id"
                        value={id}
                        onChange={handleInputChange}
                    />
                </FormGroup>

                <FormGroup tag={Col} md="8">
                    <Label for="id_category">Name Category</Label>
                    <Input
                        type="text"
                        id="edit_category_name"
                        name="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </FormGroup>

            </Row>

            <Row>
                <FormGroup tag={Col} md="6">
                    <Label for="id_catalog_media">Catalog</Label>
                    <Select
                        id="edit_category_id_multimedia"
                        name="id_catalog_media"
                        options={listDataCatalogs}
                        value={listDataCatalogs.filter(item => item.value === id_catalog_media)[0]}
                        onChange={(item) => handleInputChange({ target: { name: "id_catalog_media", value: item.value } })}
                    />
                     
                </FormGroup>

                <FormGroup tag={Col} md="6">
                    <Label for="id_category">Price of category</Label>
                    <Input
                        type="number"
                        id="edit_category_price"
                        name="price"
                        value={price}
                        onChange={handleInputChange}
                    />
                </FormGroup>

            </Row>

            <Row>

                <FormGroup tag={Col} md="12" onClick={showCategories}>
                    <Label for="id_category">Description of Category</Label>
                    <Input
                        type="textarea"
                        id="edit_category_description"
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                    />
                </FormGroup>
            </Row>

            <Row>
                <Col md="8">
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
