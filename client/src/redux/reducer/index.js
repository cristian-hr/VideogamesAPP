const initialState = {
    gamesList: [],
    searchList: [],
    details: [],
    detailsScreenshots: [],
    genresList: [],
    platforms: [],
    filtradoGen: [],
    filtradoGenSea: [],
    filtradoAdd: [],
    ordered: [],
    loading: false,
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "PRIMERA-LISTA":
            return { ...state, gamesList: [...state.gamesList, action.payload] };

        case "PAGES":
            return { ...state, gamesList: [...state.gamesList, action.payload] };

        case "PAGES-SEARCH":
            return { ...state, searchList: [...state.searchList, action.payload] };

        case "SEARCH":
            return { ...state, searchList: [...state.searchList, action.payload] };

        case "DETAILS":
            state.detailsScreenshots = [action.payload.image]
            return { ...state, details: action.payload };

        case "DETAILS_SCREENSHOTS":
            return { ...state, detailsScreenshots: [...state.detailsScreenshots, ...action.payload.map(game => game.image)] }

        case "RESET_DETAILS":
            state.detailsScreenshots = []
            state.details = []
            return state

        case "POST_GAME":
            state.gamesList[0].games.unshift(action.payload)
            return state;

        case "DESTROY_GAME":
            state.gamesList[0].games = state.gamesList[0].games.filter(game => game.id !== action.payload.id)
            return state

        case "GENRES":
            return { ...state, genresList: action.payload };

        case "PLATFORMS":
            return { ...state, platforms: action.payload };

        case "FILTERGEN":
            if (state.filtradoGen[0]?.genre !== action.payload.genre) state.filtradoGen = [];
            return { ...state, filtradoGen: [...state.filtradoGen, action.payload] };

        case "FILTERGENSEA":
            return { ...state, filtradoGenSea: [...state.filtradoGenSea, action.payload] };

        case "ORDER":
            if (state.ordered[0]?.genre !== action.payload.genre) state.ordered = [];
            if (state.ordered[0]?.order !== action.payload.order) state.ordered = [];
            if (state.ordered[0]?.filterAdd !== action.payload.filterAdd) state.ordered = [];
            return { ...state, ordered: [...state.ordered, action.payload] };

        case "FILTER_ADD":
            if (state.filtradoAdd[0]?.genre !== action.payload.genre) state.filtradoAdd = [];
            if (state.filtradoAdd[0]?.order !== action.payload.order) state.filtradoAdd = [];
            return { ...state, filtradoAdd: [...state.filtradoAdd, action.payload] };

        case "LOAD":
            return { ...state, loaded: action.payload };

        case "REQUEST_DATA":
            return { ...state, loading: true };

        case "REQUEST_SUCCESS":
            return { ...state, loading: false };

        case "RESET":
            state.searchList = [];
            state.filtradoGen = [];
            state.ordered = [];
            return state

        default:
            return state;
    }
}

export default rootReducer