
export function setSessionStore(data, name){
    sessionStorage.setItem('Client', JSON.stringify(data))
}

export function closedSections(data, name){
    sessionStorage.removeItem('Client')
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

export function parseDateIso  (dateString)  {
    if (!dateString) {
     console.error("Fecha nula o indefinida:", dateString);
     return null; 
   }  
   const dateObject = new Date(dateString);
   if (isNaN(dateObject.getTime())) {
     console.error("Fecha inválida:", dateString);
     return null;
   }
  
  return dateObject.toISOString();
}  

 export function parseDate  (dateString)  {
   dateString = dateString.replace(/\s\s+/g, ' ');
   dateString = dateString.replace(/([0-9])([AP]M)/, '$1 $2');
   const date = new Date(dateString);
   if (isNaN(date.getTime())) {
     console.error('Fecha inválida:', dateString);
     return null;
   }
   return date;
}  
    
export function formatDateString (dateString) {
    return dateString.replace(/\s\s+/g, ' ').replace('AM', ' AM').replace('PM', ' PM');
};

