const typeMethods = {
    "get":"get",
    "post":"post",
    "put":"put",
    "delete":"delete"
}

export const controller_message = async (initial_petition, error, method, tableName) => {
    
    const tableNameConvert = tableName.toLowerCase().replace("_", " ").trim()
    switch (method.toLowerCase()) {
        case typeMethods.get:
            if (error) initial_petition.message = `Error getting ${tableNameConvert}.`
            else initial_petition.message = `Data was get for ${tableNameConvert}.`
            break;

        case typeMethods.post:
            if (error) initial_petition.message = `Error to update ${tableNameConvert}.`
            else initial_petition.message = `Data was updated for ${tableNameConvert}.`
            break;

        case typeMethods.put:
            if (error) initial_petition.message = `Error getting ${tableNameConvert}.`
            else initial_petition.message = `Data was get for ${tableNameConvert}.`
            break;

        case typeMethods.delete:
            if (error) initial_petition.message = `Error to delete ${tableNameConvert}.`
            else initial_petition.message = `Was deleted ${tableNameConvert}.`
            break;

        default:
            initial_petition.message =""
    }
}
