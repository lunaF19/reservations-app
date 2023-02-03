const clipboard = {}

clipboard.copy = data => {
    return navigator.clipboard.writeText(data).then(
        () => true
    ).catch(() => false)
}



export default clipboard