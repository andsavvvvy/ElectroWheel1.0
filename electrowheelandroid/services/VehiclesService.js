import axios from 'axios'

const VEHICLE_LINK = `http://192.168.98.90:8080/vehicles`;

class VehicleService{

    getAllVehicles(){
        console.log("works vehicles");
    return axios.get(VEHICLE_LINK);
    }

    deleteVehicle(id){
         console.log(id);
        return axios.delete(`http://localhost:8080/vehicles/${id}`);
       
    }

    insertVehicle(vehicle){
        return axios.post(VEHICLE_LINK, vehicle);
    }

       updateVehicleCoordonates(vehicle){
        return axios.put(VEHICLE_LINK, vehicle);
    }

     updateVehicleAvailability(vehicle){
        console.log(vehicle);
        return axios.put(VEHICLE_LINK + `/available`, vehicle);
    }



     getAvailableVehicles(){
        return axios.get(VEHICLE_LINK + `/available`);
    }

    getVehicleById(id){
        console.log("vehicle id");
        return axios.get(VEHICLE_LINK + `/${id}`);
    }

     getVehicleByTypeId(id){
        return axios.get(VEHICLE_LINK + `/type_${id}`);
    }

     getVehicleByDate(date){
        return axios.get(VEHICLE_LINK + `/on${date}`);
    }


}

export default new VehicleService()