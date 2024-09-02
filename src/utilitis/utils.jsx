
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
    const id = data_client? data_client.id : null ;

    return [username,id]
}

export const useStateUser = () => {
    const username = GetSessionStore();
    if(username[0] != null){
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

export function parseDate(dateString) {
    if (!dateString) return null;
    
    dateString = dateString.replace(/\s\s+/g, ' ');
    dateString = dateString.replace(/([0-9])([AP]M)/, '$1 $2');
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.error('Fecha inválida:', dateString);
        return null;
    }
    return date;
}

export function formatDateString(dateString) {
    if (!dateString) return '';
    return dateString.replace(/\s\s+/g, ' ').replace('AM', ' AM').replace('PM', ' PM');
}

export function TotalHoursHistory(data){
    let total_hours = '';
   console.log(data)
    const TotalHours = (data) => {
        const totalHours = data?.reduce((total, entry) => {
            if (!entry.fecha_entrada || !entry.fecha_salida) return total;
    
            const formattedStartDateString = formatDateString(entry.fecha_entrada);
            const formattedEndDateString = formatDateString(entry.fecha_salida);
    
            const startDate = parseDate(formattedStartDateString);
            const endDate = parseDate(formattedEndDateString);
    
            if (!startDate || !endDate) {
                console.error("Fecha inválida en la entrada:", entry)
                return total;
            }
    
            const differenceInMilliseconds = endDate - startDate;
            const hours = differenceInMilliseconds / (1000 * 60 * 60);
            return total + hours;
        }, 0);

        total_hours = (Math.floor(totalHours));
    };

    TotalHours(data);

    return total_hours
}

export function TotalHoursByDay(data){
    let total_hours = '';
   console.log(data)
    const TotalHours = (data) => {
        const totalHours = data?.reduce((total, entry) => {
            if (!entry.fecha_entrada || !entry.fecha_salida) return total;
    
            const formattedStartDateString = formatDateString(entry.fecha_entrada);
            const formattedEndDateString = formatDateString(entry.fecha_salida);
    
            const startDate = parseDate(formattedStartDateString);
            const endDate = parseDate(formattedEndDateString);
    
            if (!startDate || !endDate) {
                console.error("Fecha inválida en la entrada:", entry)
                return total;
            }
    
            const differenceInMilliseconds = endDate - startDate;
            const hours = differenceInMilliseconds / (1000 * 60 * 60);
            return total + hours;
        }, 0);

        total_hours = (Math.floor(totalHours));
    };

    TotalHours(data);

    return total_hours
}
