import axios from "axios";
const { REACT_APP_BACK_URL } = process.env

export function primeraLista() {
    return async function (dispatch) {

        dispatch(requestData())

        await fetch(`${REACT_APP_BACK_URL}/videogames`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "PRIMERA-LISTA", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
}

export const pages = (number) => {
    return async function (dispatch) {

        dispatch(requestData())

         await fetch(`${REACT_APP_BACK_URL}/videogames/page/${number}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "PAGES", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
}

export const search = (name) => {
    return async function (dispatch) {

        dispatch(reset())

        dispatch(requestData())
        
        await fetch(`${REACT_APP_BACK_URL}/videogames?name=${name}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "SEARCH", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
}

export const pagesSearch = (number, name) => {
    return async function (dispatch) {

        dispatch(requestData())

        await fetch(`${REACT_APP_BACK_URL}/videogames/page/${number}?name=${name}`)
            .then(res => res.json())
            .then((res) => {               
                if (res) dispatch({ type: "PAGES-SEARCH", payload: res })
            })
            .catch(err => console.log(err))        

        dispatch(requestSuccess())
    }
}

export const details = (name) => {
    return async function (dispatch) {

        dispatch(requestData())

        dispatch({type: "RESET_DETAILS"})

        await fetch(`${REACT_APP_BACK_URL}/videogame/${name}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "DETAILS", payload: res })
            })
            .catch(err => console.log(err))

        await fetch(`${REACT_APP_BACK_URL}/videogame/screenshots/${name}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "DETAILS_SCREENSHOTS", payload: res }) 
            })
            .catch(err => console.log(err))
        

        dispatch(requestSuccess())
    }
}

export const detailsScreenshots = (name) => {
    return async function (dispatch) {

        dispatch(requestData())

        await fetch(`${REACT_APP_BACK_URL}/videogame/screenshots/${name}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "DETAILS_SCREENSHOTS", payload: res }) 
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
                   
    }
}

export const genres = (name) => {
    return async function (dispatch) {
        if (!name) name = "";
        return await fetch(`${REACT_APP_BACK_URL}/genres/${name}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "GENRES", payload: res })
            })
            .catch(err => console.log(err))
    }
};

export const platforms = () => {
    return async function (dispatch) {
        return await fetch(`${REACT_APP_BACK_URL}/platforms`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "PLATFORMS", payload: res })
            })
            .catch(err => console.log(err))
    }
};

export const filterGen = (query, page) => {
    var url;
    page ? url = `${REACT_APP_BACK_URL}/videogames/page/${page}?filtroGenero=${query}` :
        url = `${REACT_APP_BACK_URL}/videogames?filtroGenero=${query}`

    return async function (dispatch) {

        dispatch(requestData())

        await fetch(url)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "FILTERGEN", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
};

export const filterGenSea = (queryN, queryG, page) => {
    return async function (dispatch) {

        dispatch(requestData())

        await fetch(`${REACT_APP_BACK_URL}/videogames${page ? "/page/" + page : ""}?name=${queryN}&filtroGenero=${queryG}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "FILTERGENSEA", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
};

export const order = (queryOrder, queryName, queryfiltroGenero, queryfiltroAdd, page) => {  

    return async function (dispatch) {

        dispatch(requestData())

        await fetch(`${REACT_APP_BACK_URL}/videogames${page ? "/page/" + page : ""}${queryName || queryfiltroAdd || queryOrder || queryfiltroGenero ? "?" : ""}${queryName ? "name="+queryName : ""}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}${queryOrder ? "&order=" + queryOrder : ""}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "ORDER", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
};

export const filterAdd = (queryName, queryfiltroGenero, queryfiltroAdd, page) => {
    return async function (dispatch) {

        dispatch(requestData())

        await fetch(`${REACT_APP_BACK_URL}/videogames${page ? "/page/" + page : ""}${queryName || queryfiltroAdd || queryfiltroGenero ? "?" : ""}${queryName ? "name="+queryName : ""}${queryfiltroAdd ? "&filtroAdd=" + queryfiltroAdd : ""}${queryfiltroGenero ? "&filtroGenero=" + queryfiltroGenero : ""}`)
            .then(res => res.json())
            .then((res) => {
                if (res) dispatch({ type: "FILTER_ADD", payload: res })
            })
            .catch(err => console.log(err))

        dispatch(requestSuccess())
    }
};

export const postGame = (data) => {
    return async function (dispatch) {

        dispatch(requestData())

        const respAddGame = await axios.post(`${REACT_APP_BACK_URL}/videogame`, data)

        await dispatch({type: "POST_GAME", payload: respAddGame.data})

        dispatch(requestSuccess())
    } 
}

export const destroyGame = (game) => {
    return async function (dispatch) {

        dispatch(requestData())

        await axios.delete(`${REACT_APP_BACK_URL}/videogame`, {data: game})

        await dispatch({type: "DESTROY_GAME", payload: game})

        dispatch(requestSuccess())
    }
}

export const requestData = () => ({
    type: "REQUEST_DATA",
});
export const requestSuccess = () => ({
    type: "REQUEST_SUCCESS",
});

export const reset = () => ({
    type: "RESET",
})
