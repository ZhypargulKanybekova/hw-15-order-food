
export const fetchRequest = async (urlPath,options={})=>{
    
    try {
        
        const BASE_URL = 'http://ec2-35-156-167-238.eu-central-1.compute.amazonaws.com:5500/api/v1'
        const requestOption = {
        method:options.method || 'GET',
        headers:{
            'Content-Type':`application/json`,
            UserId : 'Zhypargul',
        },
     } ;
    if (options.method !== 'GET'){
        requestOption.body = JSON.stringify(options.body);
    }
    const response = await fetch (`${BASE_URL}${urlPath}`,requestOption);
    const data = await response.json();
    return data.data;
    } catch (error) {
        new Error (error) 
    }
    
}
