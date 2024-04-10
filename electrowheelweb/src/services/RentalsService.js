import axios from 'axios'

const RENTAL_LINK = `http://localhost:8080/rentals`;

class RentalService{

     getAllRentals(){
    return axios.get(RENTAL_LINK);
    }

    deleteRental(id){
        return axios.delete(RENTAL_LINK + `/${id}`);
    }

    insertRental(rental){
        return axios.post(RENTAL_LINK, rental);
    }

       updateRentalAfterEndOfTrip(rental){
        return axios.put(RENTAL_LINK + rental);
    }

     getOngoingRentals(){
        return axios.get(RENTAL_LINK + `/ongoing`);
    }

    getRentalById(id){
        console.log(id);
        return axios.get(RENTAL_LINK + `/${id}`);
    }

     getRentalByVehicleId(id){
        return axios.get(RENTAL_LINK + `/vehicle_${id}`);
    }

     getRentalByCustomerId(id){
        return axios.get(RENTAL_LINK + `/customer_${id}`);
    }

     getRentalByInvoiceId(id){
        return axios.get(RENTAL_LINK + `/invoice_${id}`);
    }

     getRentalByDate(date){
        return axios.get(RENTAL_LINK + `/on${date}`);
    }

}
export default new RentalService()