
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

export function before_date(){
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - 3);
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0'); 
        return `${year}-${month}-${day}`;
} 

export function DateFormatUs(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    return `${year}-${month}-${day}`;
} 

