const asyncHandeler = (requestHandeler) => {//requestHandeler parameter hai yaha kuch bhi ho dakta hai
    return (req, res, next) => {
        Promise.resolve(requestHandeler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandeler };
