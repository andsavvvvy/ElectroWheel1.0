import axios from 'axios'

const INVOICE_LINK = `http://192.168.98.90:8080/invoices`;

class InvoiceService{

    getAllInvoices(){
        console.log("works");
    return axios.get(INVOICE_LINK);
    }

    deleteInvoice(id){
        return axios.delete(INVOICE_LINK + `/${id}`);
    }

    insertInvoice(invoice){
        return axios.post(INVOICE_LINK, invoice);
    }

       updateInvoicePaidStatus(invoice){
        return axios.put(INVOICE_LINK, invoice);
    }

      getNewInvoiceId(){
        return axios.get(INVOICE_LINK + `/latestId`);
    }


     getPaidInvoices(){
        return axios.get(INVOICE_LINK + `/paid`);
    }

     getUnPaidInvoices(){
        return axios.get(INVOICE_LINK + `/unpaid`);
    }

    getInvoiceById(id){
         console.log("invoice id");
        return axios.get(INVOICE_LINK + `/${id}`);
    }

}

export default new InvoiceService()