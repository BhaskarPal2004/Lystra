export const converDate =(date)=>{
    const Date = date.toLocaleDateString("en-GB");
    const Time = date.toLocaleTimeString();
    return [Time,Date];
}