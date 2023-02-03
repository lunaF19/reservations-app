export const controller_errors = async (initial_petition, error) => {

    const {
        code,
        errno,
        sqlMessage,
        sqlState,
        sql
    } = error

    initial_petition.error = {
        errCode: code,
        errMessage: sqlMessage,
        message: diccionaryErrors[code] || "Ha ocurrido un error!"
    }
    return;
}


const diccionaryErrors = {

}