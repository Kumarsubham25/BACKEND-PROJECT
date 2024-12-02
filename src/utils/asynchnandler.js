const asyncHandeler = (requesthandeler) => {
    (req, res, next) => {
        Promise.resolve(requesthandeler(req, res, next)).
            catch((err) => next(err))
    }

}

export { asyncHandeler }