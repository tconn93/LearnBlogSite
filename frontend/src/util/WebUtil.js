const url = import.meta.env.VITE_WEB_URL;

class WebUtil {

    static URL = url;

    static headers(body){

        let head = {
                'Content-Type': 'application/json',
                'Accept': '*/*',
                'Content-Length': body.length+"",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
            };
        return head;
    } 

}
export default WebUtil;