import React, { useEffect, useState, useMemo } from 'react'
import {
    CardImg, Row, Col, FormGroup, Label, Input, Button, Form,
    Accordion, AccordionBody, AccordionHeader, AccordionItem
} from 'reactstrap'
import Modal from 'react-bootstrap/Modal';

import Select from "react-select"

import { CardWithShadow } from '../../UI/components/CardWithShadow'

import { LoadingTableData, useForm } from '../../UI';
import notify from '../../UI/utils/notify';
import Swal from 'sweetalert2';
import DataTable from 'react-data-table-component';
import { columnsManteCatalogMedia } from '../types/columnsTablesAdm';
import { usePetitionsAdm } from '../hooks/usePetitionsAdm';
import { typesPetitionsAdm } from '../types/typesPetitionsAdm';



export const PageManteCatalogMedia = () => {

    const [dataGrid, setDataGrid] = useState([])
    const [listOfCatalogMedia, setListOfCatalogMedia] = useState([])

    const [showModal, setShowModal] = useState(false)
    const [indexDataModal, setIndexDataModal] = useState(0)


    const [dml, setDml] = useState("I")
    const [gridDataLoading, setGridDataLoading] = useState(false)
    const [listDataLoading, setListDataLoading] = useState(false)


    const { setIndicatorPetitionAdm, setTextNotify, indicatorPetitionAdm, dataPetitionAdm, setPetitionAdm, setIsLoadingAdm } = usePetitionsAdm()

    const { formValues, updateDataForm, handleInputChange } = useForm({})
    const { id, } = formValues

    const getDataCatalogMedia = id => {

        const ids = listOfCatalogMedia.map(item => item.value)
        if (!id) return;

        if (!ids.includes(id)) {
            notify.warning("Este no es un id valido")
            return;
        }

        setPetitionAdm({ id })
        setIndicatorPetitionAdm(typesPetitionsAdm.getCatalogMediaData)
        setGridDataLoading(true)
        handleInputChange({ target: { name: "num_order", value: 0 } })
    }

    const updateCatalogMedia = data => {
        setPetitionAdm(data)
        setIndicatorPetitionAdm(typesPetitionsAdm.updataCatalogMedia)
    }

    const addNewCatalog = id => {
        setIndicatorPetitionAdm(typesPetitionsAdm.updateCatalogs)
        setPetitionAdm({ id })
    }

    const deleteImage = item => {
        const { id, num_order } = item
        setPetitionAdm({ id, num_order })
        setIndicatorPetitionAdm(typesPetitionsAdm.deleteCatalogMedia)
    }

    const showModalImage = item => {
        const indexData = dataGrid.map(({ num_order }) => num_order).indexOf(item.num_order)

        console.log({ indexData })
        if (indexData > -1) {
            setIndexDataModal(indexData)
            setShowModal(true)
        } else {
            notify.warning("no es valido el dato seleccionado")
        }
    }

    const btnDeleteImage = {
        cell: (data) => <Button size="sm" color="danger" onClick={() => deleteImage(data)}>Delete</Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }

    const btnShowImage = {
        cell: (data) => <Button size="sm" color="primary" onClick={() => showModalImage(data)}>Show Image</Button>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    }

    const columnsGrid = [...columnsManteCatalogMedia, btnShowImage, btnDeleteImage]


    const titleOfTable =  useMemo(() => {
        if ( formValues.id ) {
            return `Upload images for catalog: "${formValues.id}"`
        } else return 'Select a category for upload images.'
    }, [formValues.id]);
    
    useEffect(() => {
        setListDataLoading(true)
        setShowModal(false)
        setTimeout(() => setIndicatorPetitionAdm(typesPetitionsAdm.getCatalogs), 1000)
        return clearTimeout
    }, [])

    useEffect(() => {
        switch (dataPetitionAdm.indicatorPetitionAdm) {
            case typesPetitionsAdm.getCatalogs:
                setListDataLoading(false)
                if (dataPetitionAdm.result?.data) {
                    const list = dataPetitionAdm.result.data.map(item => ({ label: item.id, value: item.id }))
                    setListOfCatalogMedia(list)
                }
                break;
            case typesPetitionsAdm.getCatalogMediaData:
                if (dataPetitionAdm.result?.data) {
                    setDataGrid(dataPetitionAdm.result?.data)
                }
                setGridDataLoading(false)
                break;
            case typesPetitionsAdm.updateCatalogs:
                setIndicatorPetitionAdm(typesPetitionsAdm.getCatalogs)
                break;
            case typesPetitionsAdm.updataCatalogMedia:
                getDataCatalogMedia(id)
                setGridDataLoading(true)
                break;
            case typesPetitionsAdm.deleteCatalogMedia:
                getDataCatalogMedia(id)
                setGridDataLoading(true)
                break;
            default: break;
        }
    }, [dataPetitionAdm])

    return (
        <>

            <ModalImage
                dataGrid={dataGrid}
                indexDataModal={indexDataModal}
                setIndexDataModal={setIndexDataModal}
                setShowModal={setShowModal}
                showModal={showModal}

            />

            <div className='container'>

                <Row className='mt-5'>

                    <Col md="6" >
                        <DataTable
                            title={titleOfTable}
                            //onRowClicked={item => updateFormData(item)}
                            //onRowDoubleClicked={item => updateFormData(item)}
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
                            <FormCatalogMedia




                                updateCatalogMedia={updateCatalogMedia}
                                addNewCatalog={addNewCatalog}

                                usedNums={dataGrid.map(item => parseInt(item.num_order))}
                                getDataCatalogMedia={getDataCatalogMedia}

                                isListDataLoading={listDataLoading || setIsLoadingAdm}
                                isGridDataLoading={gridDataLoading}

                                dataEdit={formValues}
                                dml={dml}

                                listOfCatalogMedia={listOfCatalogMedia}
                                setListOfCatalogMedia={setListOfCatalogMedia}

                                handleInputChange={handleInputChange}
                            />


                        </CardWithShadow>

                    </Col>

                </Row>

            </div>

        </>
    )
}



const FormCatalogMedia = ({
    usedNums,
    addNewCatalog,
    updateCatalogMedia,


    getDataCatalogMedia,
    handleInputChange,

    listOfCatalogMedia,
    setListOfCatalogMedia,

    isListDataLoading,
    isGridDataLoading,

    dml,
    dataEdit,
    updateData,

}) => {

    const [file, setFile] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const listOfOrder = (usedNums.length === 0 ? [1] :  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(item => !usedNums.includes(item) )).map(item => ({ value: item, label: item }))

    const [image, setImage] = useState(new FormData())
    const [newId, setNewId] = useState("")

    const {
        id,
        num_order
    } = dataEdit

    const handlerImg = e => {
        const imageMimeType = /image\/(png|jpg|jpeg)/i;
        const loadFile = e.target.files[0]

        if (loadFile) {
            if (!loadFile.type.match(imageMimeType)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No es formato de imagen valido",
                    footer: "Para subir una foto de perfil es necesario un formato valido!",
                });
                return;
            }

            if (loadFile.size && loadFile.size > 500000) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La imagen seleccionada es demaciado grande",
                    footer: "Para subir una foto de perfil es necesario un formato valido!",
                });
                return;
            }
            const formData = new FormData();
            formData.append("", loadFile)
            setImage(formData)
            setFile(loadFile)

        }
    }

    const addNewFileCatalogMedia = () => {
        if (!listOfOrder.find(item => parseInt(item.value) === num_order)) {
            notify.warning("Se debe eligir un orden válido.")
            return;
        }

        if (!selectedImage) {
            notify.warning("Se debe elegir un archivo valido!")
            return;
        }
        updateCatalogMedia({ id, num_order, dml: "I", file: image })

    }

    const addNewCatalogMedia = () => {
        if (!newId) {
            notify.warning("Este no es un id valido!")
            return;
        }

        const ids = listOfCatalogMedia.map(item => item.value)

        if (ids.includes(newId)) {
            notify.warning("Este id ya existe!")
            return;
        }

        setNewId("")
        addNewCatalog(newId)
        //setListOfCatalogMedia(prev => ([{ value: newId, label: newId }, ...prev]))
        //handleInputChange({ target: { name: "id", value: newId } })
    }

    const clearId = id => {
        return id.toLowerCase().replace(" ", "")

    }

    const handleInputChangeAdd = ({ target: { name, value } }) => {
        const newValue = clearId(value)
        setNewId(newValue)
    }

    useEffect(() => { getDataCatalogMedia(id) }, [id])


    // Se encargar de convertir el archivo a formato para src
    useEffect(() => {
        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setSelectedImage(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [file]);

    return (

        <Form onSubmit={updateData}>

            <Button
                block
                color="secondary"
                onClick={addNewCatalogMedia}
            >
                Add new catalog of media
            </Button>

            <Row>

                <FormGroup tag={Col} md="12">
                    <Label for="id_add">Id catalog of media</Label>
                    <Input
                        type="text"
                        id="edit_id_add"
                        name="id_add"
                        value={newId}
                        onChange={handleInputChangeAdd}
                    />
                </FormGroup>

            </Row>
            <hr />

            <Row>
                <FormGroup tag={Col} md="12">
                    <Label for="catalog_media_id">Catalog Media:</Label>
                    <Select
                        isDisabled={isGridDataLoading}
                        isLoading={isListDataLoading}
                        id="catalog_media_id"
                        options={listOfCatalogMedia}
                        value={listOfCatalogMedia.find(item => item.value === id)}
                        onChange={
                            (item) => handleInputChange({ target: { name: "id", value: item.value } })
                        }
                    />
                </FormGroup>
            </Row>

            <Row>
                <FormGroup tag={Col} md="4">
                    <Select
                        isDisabled={isGridDataLoading || !id}
                        //isLoading={isListDataLoading}
                        id="catalog_media_num_order"
                        options={listOfOrder}
                        value={listOfOrder.find(item => item.value === num_order)}
                        onChange={
                            (item) => handleInputChange({ target: { name: "num_order", value: item.value } })
                        }
                    />
                </FormGroup>

                <FormGroup tag={Col} md="8">
                    <Input
                        onChange={handlerImg}
                        disabled={isGridDataLoading || !id}
                        id="catalog_media_file"
                        type="file"
                        accept='image/*'
                    />
                </FormGroup>


            </Row>

            <Button
                disabled={isGridDataLoading || !id}
                block
                color="secondary"
                onClick={addNewFileCatalogMedia}
            >
                Add new file in the catalog of media
            </Button>

            <AccordionImg srcImg={selectedImage} />

        </Form>
    )
}


const AccordionImg = ({
    srcImg
}) => {

    const [openImg, setOpenImg] = useState(null);
    return (
        <Accordion className="mt-2" open={openImg} toggle={(id) => setOpenImg(prev => prev === id ? null : id)}>
            <AccordionItem>
                <AccordionHeader targetId="1">Show image</AccordionHeader>

                <AccordionBody accordionId="1">

                    {
                        srcImg
                            ? <CardImg src={srcImg} />
                            : <span className='fs-6'>Aun no se ha selecionado una imagen.</span>
                    }

                </AccordionBody>
            </AccordionItem>
            
        </Accordion>
    )
}

const ModalImage = ({
    setIndexDataModal,
    indexDataModal,
    dataGrid,
    setShowModal,
    showModal
}) => {

    const {
        id,
        num_order,
        url_media = "",
    } = dataGrid[indexDataModal] || {}

    const totalReg = dataGrid.length

    const nextImage = () => {
        setIndexDataModal(prev => (prev >= totalReg - 1) ? 0 : parseInt(prev + 1))
    }

    const prevImage = () => {
        setIndexDataModal(prev => (prev <= 0) ? totalReg - 1 : parseInt(prev - 1))
    }

    return (
        <Modal
            onHide={() => setShowModal(false)}
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {/* <Modal.Header className='container' closeButton={() => console.log()}>
                <Modal.Title id="contained-modal-title-vcenter">

                </Modal.Title>
            </Modal.Header> */}

            <Modal.Body>
                <Row>

                    <Col md="3">
                        <Button
                            block
                            onClick={prevImage}
                        >
                            {"<< "} Pre
                        </Button>
                    </Col>

                    <Col md="6" className='text-center'>
                        <span className='fs-5'>
                            Image <strong>#{num_order}</strong> of <strong>{id}</strong>
                        </span>

                    </Col>

                    <Col md="3">
                        <Button
                            block
                            onClick={nextImage}
                        >

                            Next {">> "}
                        </Button>
                    </Col>

                </Row>

                <Row className='p-1'>
                    <CardImg
                        src={url_media}
                    />
                </Row>

            </Modal.Body>

            <Modal.Footer>
                <Button block onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}