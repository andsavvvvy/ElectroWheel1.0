import axios from 'axios'

const CUSTOMER_LINK = `http://192.168.98.90:8080/customers`;

class CustomerService{

     getAllCustomers(){
    return axios.get(CUSTOMER_LINK);
    }

    deleteCustomer(id){
        return axios.delete(CUSTOMER_LINK + `/${id}`);
    }

    insertCustomer(customer){
        console.log(customer);
        return axios.post(CUSTOMER_LINK, customer);
    }

       updateCustomerName(customer){
        return axios.put(CUSTOMER_LINK + `/namechange`, customer);
    }

     updateCustomerBillingAddress(customer){
        return axios.put(CUSTOMER_LINK + `/billingaddresschange`, customer);
    }

    updateCustomerEmailAndPassword(customer){
        return axios.put(CUSTOMER_LINK + `/login`, customer);
    }

    getNewCustomerId(){
        console.log("works");
        return axios.get(CUSTOMER_LINK + `/latestId`);
    }


    customerLogin(email, password){
        console.log(CUSTOMER_LINK + `/login/${email}-${password}`);

        return axios.get(CUSTOMER_LINK + `/login/${email}-${password}`);
    }


    getCustomerById(id){
        return axios.get(CUSTOMER_LINK + `/${id}`);
    }

     getCustomerByEmail(email){
        console.log(email);
        return axios.put(CUSTOMER_LINK + `/${email}`);
    }

     getBannedCustomers(){
        return axios.get(CUSTOMER_LINK + `/banned`);
    }

     updateCustomerWarningLevel(customer){
        return axios.put(CUSTOMER_LINK + `/banned`, customer);
    }

}

export default new CustomerService()