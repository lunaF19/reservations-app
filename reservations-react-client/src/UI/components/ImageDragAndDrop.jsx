import "./imageDragAndDrop.css"

import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2"
import { RiFileUploadLine } from "react-icons/ri"
import { useRef } from "react"
import Resizer from "react-image-file-resizer";


export const ImageDragAndDrop = ({
    setUrlImage,
    urlImage,
    returnFile = file => console.error("File dont manage!!!")
}) => {


    const [dragStatus, setDragStatus] = useState("")
    const [numDrag, setNumDrag] = useState(0)

    const labelInputFileImageRef = useRef(null)


    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });


    const processFile = file => {

        const imageMimeType = /image\/(png|jpg|jpeg)/i;
        if (file) {
            if (!file.type.match(imageMimeType)) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No es formato de imagen valido",
                    footer: "Para subir una foto de perfil es necesario un formato valido!",
                });
                //notify.error("El tipo de archivo seleccionado no es valido!")
                return;
            }

            if (file.size && file.size > 500000) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "La imagen seleccionada es demaciado grande",
                    footer: "Para subir una foto de perfil es necesario un formato valido!",
                });
                return;
            }
            resizeFile(file).then(resFile => {
                console.log({ resFile })
                setUrlImage(resFile)
                returnFile(file)

            }).catch(errFile => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error al procesar la imagen",
                    footer: errFile,
                });
                console.error(errFile)
            })
            labelInputFileImageRef.current.innerHTML = `${file.name.substring(0, 50)}`

        }

    }

    const onDropFile = (e) => {
        e.preventDefault();
        setDragStatus("")

        if (e.dataTransfer.files.length !== 1) {
            alert("Debe ser solo 1 archivo!")
            return;
        }

        processFile(e.dataTransfer.files[0])

    }

    const handelInputImage = e => {
        e.preventDefault();
        setDragStatus("")

        if (e.target.files.length !== 1) {
            alert("Debe ser solo 1 archivo!")
            return;
        }

        processFile(e.target.files[0])
    }
    
    useEffect(() => {
        const prevNumDrag = numDrag

        const timeoutDrag = setTimeout(() => {
            if (numDrag === prevNumDrag) {
                setDragStatus("")
            }
        }, 1000)
        return () => clearTimeout(timeoutDrag)
    })

    return (
        <>
            {/* {
                JSON.stringify({ dragStatus, numDrag })
            } */}
            <div
                style={{
                    "--var-bk-image": `url("${urlImage}")`
                }}
                className={`img-drag-drop`}
                droppable={"true"}
                onDrop={onDropFile}
                onDragEnter={e => {
                    e.preventDefault()
                    // setDragStatus("entered")
                }}

                onDragOver={e => e.preventDefault()}

                onDragOverCapture={e => {
                    e.preventDefault()
                    setNumDrag(prev => prev + 1)
                    setDragStatus("entered")
                }}

            >
                <div className={`message-drop ${dragStatus}`} >
                    <span style={{ display: "block", width: "100%" }}>Drop your file here</span>
                    <RiFileUploadLine size={"50px"} />
                </div>

                <div
                    className={`div-image ${dragStatus}`}
                    style={{
                        "--var-bk-color": "red",

                    }}
                >
                    {/* <img
                        onClick={e => labelInputFileImageRef.current.click()}
                        draggable={"false"}
                        className={`image ${dragStatus}`}
                        src={urlImage}
                        onDragEnter={e => {
                            e.preventDefault()
                            setDragStatus("entered")
                        }}
                    /> */}
                </div>


                <div className={`div-input-file  ${dragStatus}`}>
                    <label for="image-file" ref={labelInputFileImageRef}>Chose a file</label>
                    <input
                        id="image-file"
                        onChange={handelInputImage}
                        type="file"
                        accept='image/*'
                        // draggable
                        className={`input-file ${dragStatus}`}
                        onDragEnter={e => {
                            e.preventDefault()
                            setDragStatus("entered")
                        }}
                    />
                </div>

            </div>
        </>
    )
}

