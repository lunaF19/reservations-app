import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, FormGroup, Label, Input, Button, Card } from 'reactstrap'

import { MdOutlineSave, /* MdOutlineSaveAlt*/ } from 'react-icons/md'


import { ImageDragAndDrop, useForm, usePetitions } from '../../UI';

import { Form } from 'react-bootstrap';
import { typesPetitions } from '../../UI';
import notify from '../../UI/utils/notify';
import { AuthContext } from '../context';

export const PageProfileUser = () => {

    const initalForm = {
        name: "",
        lastname1: "",
        lastname2: "",
        email: "",
        nacionality_code: 0,
        phone1: 0,
        phone2: 0,
        url_image: "/default_profile_image.webp",
        
    }

    const [dml, setDml] = useState(null)
    const [file, setFile] = useState(null)

    const { onCompleteInfo } = useContext(AuthContext)
    const { formValues, handleInputChange, updateDataForm } = useForm(initalForm);

    const { setIndicatorPetition, dataPetition, setPetition } = usePetitions()

    const {
        id,
        name,
        lastname1,
        lastname2,
        email,
        phone1,
        phone2,
        url_image,
    } = formValues

    const uploadImage = () => {

        if (dml !== "U") {
            notify.warning("Primero se debe ingresar actualizar la información del usuario.")
            return;
        }
        if (file === null) {
            notify.warning("Aun no se ha eligido un archivo.")
            return;
        }

        if (file) setIndicatorPetition(typesPetitions.updateUserImage)
        else notify.warning("Algo ha salido mal!")
    }

    const hadleOnSubmit = e => {
        e.preventDefault()
        const user = { ...formValues }
        setPetition({ user, dml })
        setIndicatorPetition(typesPetitions.updateUserData)
    }

    useEffect(() => {
        setIndicatorPetition(typesPetitions.getUserData)
    }, [])

    useEffect(() => {
        switch (dataPetition.indicatorPetition) {
            case typesPetitions.getUserData:
                if (dataPetition.result.data[0]) {
                    setDml("U")
                    const data = dataPetition.result.data[0]
                    data.url_image ??= "/default_profile_image.webp"
                    updateDataForm(dataPetition.result.data[0])
                } else {
                    setDml("I")
                }
                break;
            case typesPetitions.updateUserData:
                if (dataPetition.result?.affectedRows === 1) {
                    onCompleteInfo({ ...formValues })
                    setDml("U")
                }
                break;
            case typesPetitions.updateUserImage:
                if (dataPetition.result?.affectedRows === 1) {
                    console.log({ url_image: dataPetition.result.url_image })
                    onCompleteInfo({ url_image: dataPetition.result.url_image })
                    setDml("U")
                }
                break;
            default: break;
        }

    }, [dataPetition])

    return (
        <Form onSubmit={hadleOnSubmit}>

            <div className='container'>

                <Row>
                    <Col md="1"></Col>

                    <Col md="3">

                        <CardImageUser
                            uploadImage={uploadImage}
                            setUrlImage={setFile}
                            urlImage={file || url_image}
                            returnFile={file => setPetition(file)}

                        />
                    </Col>

                    <Col md="6" className='mt-5'>


                        <Row>

                            <FormGroup tag={Col} md="12" className=''>

                                <Row>
                                    <Col md="12">
                                        <Label for="name">Name:</Label>
                                        <Input
                                            required
                                            name="name"
                                            id="name"
                                            value={name}
                                            placeholder="Introduce your name"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </Row>

                                <Row className='mt-2'>

                                    <Col md="6">

                                        <Input
                                            required
                                            name="lastname1"
                                            id="lastname1"
                                            value={lastname1}
                                            placeholder="Introduce your lastname1"
                                            onChange={handleInputChange}
                                        />
                                    </Col>

                                    <Col md="6">

                                        <Input
                                            required
                                            name="lastname2"
                                            id="lastname2"
                                            value={lastname2}
                                            placeholder="Introduce your lastname2"
                                            onChange={handleInputChange}
                                        />
                                    </Col>

                                </Row>

                            </FormGroup>

                            <FormGroup tag={Col} md="12">
                                <Row>
                                    <Col md="12">
                                        <Label for="email">Your email:</Label>
                                        <Input
                                            required
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            placeholder="Introduce your email"
                                            onChange={handleInputChange}
                                        />
                                    </Col>

                                </Row>

                                <Row>

                                    <Col md="6">
                                        <Label for="phone1">Phone(1):</Label>
                                        <Input
                                            required
                                            type="number"
                                            name="phone1"
                                            id="phone1"
                                            value={phone1}
                                            placeholder="Introduce your phone1"
                                            onChange={handleInputChange}
                                        />
                                    </Col>

                                    <Col md="6">
                                        <Label for="phone2">Phone(2):</Label>
                                        <Input
                                            type="number"
                                            name="phone2"
                                            id="phone2"
                                            value={phone2}
                                            placeholder="Introduce your phone2"
                                            onChange={handleInputChange}
                                        />
                                    </Col>

                                    <Col md="8">


                                    </Col>

                                    <Col md="4" className="mt-3">

                                        <Button
                                            block
                                            color="primary"
                                            type='submit'
                                            className='mt-1'>
                                            Save

                                        </Button>

                                    </Col>


                                </Row>

                            </FormGroup>

                        </Row>

                    </Col>

                </Row>

            </div>
        </Form>
    )
}



const CardImageUser = ({
    setUrlImage,
    urlImage,
    uploadImage,
    returnFile,
    // img,
    // handlerImg,
}) => {

    return (
        <Card
            md="12"
            className='shadow-lg bg-body rounded mt-5 p-3'
            style={{
                maxHeight: "20rem"
            }}
        >

            <ImageDragAndDrop
                setUrlImage={setUrlImage}
                urlImage={urlImage || "/img-profile-upload-black-2.png"}
                returnFile={returnFile}
            />

            <Button
                color="primary"
                className='mt-1'
                block
                //style={{ backgroundColor: '#ff0049' }}
                onClick={uploadImage}
            >
                Save Image <MdOutlineSave size={30} />
            </Button>


        </Card>
    )
}