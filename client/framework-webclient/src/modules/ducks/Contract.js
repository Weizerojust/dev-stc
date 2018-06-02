const SET_LIST = 'Contract/SET_LIST';
const RM_CONTENT = 'Contract/RM_CONTENT';
const SET_CONTENT = 'Contract/SET_CONTENT';
const SET_FILTER = 'Contract/SET_FILTER';

const initialState = {
    listFilter: () => true,//绑定按钮传入的过滤条件
    listMap: { },  //项目集合，用key-value表示，key为id，value为ContractData
    //ContractData为对象，仍然包含id字段
};

export const ContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            const list = action.payload;
            console.log(list);
            return {
                ...state,
                listMap: list.reduce((listMap, ContractData) => {
                    listMap[ContractData.id] = ContractData;
                    return listMap;
                }, {}),
            };
        case RM_CONTENT:
            const id = action.payload;
            const newListMap = state.listMap;
            delete newListMap[id];
            return {
                ...state,
                listMap: newListMap
            };
        case SET_CONTENT: {
            const {id} = action.payload;
            const ContractData = action.payload;
            const newData = {
                ...state.listMap[id],
                ...ContractData,
            };
            return {
                ...state,
                listMap: {
                    ...state.listMap,
                    [id]: newData,
                },
            };
        }
        case SET_FILTER:
            const listFilter = action.payload;
            return {
                ...state,
                listFilter: listFilter,
            };
        default:
            return state;
    }
};

export const setContractList = (list) => {
    return {
        type: SET_LIST,
        payload: list,
    }
};

export const removeContract = (id) => {
    return {
        type: RM_CONTENT,
        payload: id,
    }
};

export const setContractContent = (ContractData) => {
    return {
        type: SET_CONTENT,
        payload: ContractData,
    }
};

export const setContractFilter = (listFilter) => {
    return {
        type: SET_FILTER,
        payload: listFilter,
    }
};