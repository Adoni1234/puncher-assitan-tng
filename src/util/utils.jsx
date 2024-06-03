
export function setSessionStore(data, name){
    sessionStorage.setItem('Client', JSON.stringify(data))
}

export function GetSessionStore() {
    const DataStore = sessionStorage.getItem('Client')

    const data_client =  JSON.parse(DataStore)
    const username = data_client? data_client.username : null ;

    return username
}

export const useStateUser = () => {
    const username = GetSessionStore();

    if(username != null){
        return true
    }

    return false
};

