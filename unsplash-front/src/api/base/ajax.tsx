import $ from "jquery";
import Cookies from "js-cookie";



export default abstract class APIBase{

    private handleErrors = (jqXHR: JQuery.jqXHR, textStatus: JQuery.Ajax.ErrorTextStatus): void => {
        switch (jqXHR.status){
            case 0: {
                alert('Not connect. Verify Network.');
                return;
            }
            case 404: {
                alert('Requested page not found (404).');
                return;
            }
            case 500: {
                alert('Internal Server Error (500).');
                return;
            }
        }
        switch (textStatus) {
            case "parsererror": {
                alert('Requested JSON parse failed.');
                return;
            }
            case "timeout": {
                alert('Time out error.');
                return;
            }
            case "abort": {
                alert('Ajax request aborted.');
                return;
            }
            default: {
                alert('Uncaught Error. ' + jqXHR.responseText);
                return;
            }
        }
    }

    private parseFormData(data: object): FormData{
        const formData = new FormData()
        $.each(data, function (key,value){
            formData.append(key, value)
        })
        return formData
    }

    protected sendRequest = (url: string, method:string="GET", data:object= {}, settings?:JQuery.AjaxSettings):JQuery.jqXHR => {
        const formData = this.parseFormData(data);
        return $.ajax({
            url: url,
            method: method,
            data: formData,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken'),
                'Authorization': 'Bearer '+ Cookies.get('access'),
            },
            ...this.settings,
            ...settings
        })
    }

    private settings: JQuery.AjaxSettings = {
        contentType: false,
        processData: false,
        error: this.handleErrors,
    }

}
