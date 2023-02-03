export const createWhereSql = ({ filters }) => {
    const where = Object.keys(filters).reduce((current, item) => {
        if (filters[item]) {
            if (current === ""){
                if (typeof filters[item]  === "number") return `${item} = ${filters[item]}`
                if (typeof filters[item]  === "string") return `${item} = '${filters[item]}'`
            } else {
                if (typeof filters[item]  === "number") return `${current} And ${item} = ${filters[item]}`
                if (typeof filters[item]  === "string") return `${current} And ${item} = '${filters[item]}' `
            } 
        }
        return current
    }, "")

    return where;
}


export const createUpdateSql = ({ table, pks, updateParams }) => {

    const isPks = Object.keys(pks)

    const paramsUpdate = Object.keys(updateParams).reduce((acum, item) => {

        if (isPks.includes(item)) return acum
        else {
            if (typeof updateParams[item] === "number") return `${acum}${item} = ${updateParams[item]}, `
            if (typeof updateParams[item] === "string") return `${acum}${item} = '${updateParams[item]}', `
        }
    }, "")

    const paramsPkUpdate = createWhereSql({ filters: pks})
    
    const sqlSenteceUpdate = `
    Update ${table}
    Set
    ${paramsUpdate.substring(0, paramsUpdate.length - 2)}
    Where
    ${paramsPkUpdate}
    ;
    `
    // ${paramsPkUpdate.substring(0, paramsPkUpdate.length - 2)}

    return sqlSenteceUpdate
}

export const createInsertSql = ({ table, insertParams }) => {

    const insertColumns = Object.keys(insertParams).reduce((acum, item) => {
        return `${acum} ${item}, `
    }, "")

    const insertValues = Object.values(insertParams).reduce((acum, item) => {
        if (typeof item === "number") return `${acum} ${item}, `
        if (typeof item === "string") return `${acum} '${item}', `
    }, "")
    
    const sqlSenteceInsert = `
    Insert Into ${table} 
    ( ${insertColumns.substring(0, insertColumns.length - 2)})
    Values
    ( ${insertValues.substring(0, insertValues.length - 2)} ); `

    return sqlSenteceInsert
}

