export function getStorageAccessToken(){
    const storage = localStorage.getItem('session-token');
    if(storage != null ){
      const storageData = JSON.parse(storage);
 var accessToken = storageData?.accessToken;
}

return accessToken;

}