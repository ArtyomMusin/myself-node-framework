module.exports = (url) => (req, res) => {
    const parsedUrl = new URL(`${url}${req.url}`)
    const params = {}
    parsedUrl.searchParams.forEach((value, key) => params[key] = value)

    req.pathname = parsedUrl.pathname
    req.params = params
}