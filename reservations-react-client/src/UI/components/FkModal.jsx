import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DataTable from 'react-data-table-component';

export const FkModal = ({
    title = "",
    showModal,
    setShowModal,

    dataGridFk,
    columnsGridFk,

    onClick = () => console.error("Aun no se tiene asinganda una acción para el dobel click."),
    ondbClick = () => console.error("Aun no se tiene asinganda una acción para el dobel click.")
}) => {


    return (
        <Modal
            onHide={() => setShowModal(false)}
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton={()=>console.log()}>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DataTable
                    title=""
                    onRowClicked={item => onClick(item)}
                    onRowDoubleClicked={item => ondbClick(item)}
                    //progressPending={gridDataLoading}
                    //progressComponent={<LoadingTableData />}
                    columns={columnsGridFk}
                    data={dataGridFk}
                    pagination
                />
            </Modal.Body>
            <Modal.Footer>
                <Button block onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    )

}