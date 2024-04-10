import axios from 'axios'

const VEHICLE_TYPE_LINK = `http://192.168.98.90:8080/vehicletypes`;

class VehicleTypesService{

    getAllVehicleTypes(){
        console.log("works");
    return axios.get(VEHICLE_TYPE_LINK);
    }

    deleteVehicleType(id){
        return axios.delete(VEHICLE_TYPE_LINK + `/${id}`);
    }

    insertVehicleType(type){
        return axios.post(VEHICLE_TYPE_LINK, type);
    }

       updateVehiclePricePerMinute(type){
        console.log(type);
        return axios.put(VEHICLE_TYPE_LINK, type);
    }


    getVehicleTypeById(id){
        console.log("type id");
        return axios.get(VEHICLE_TYPE_LINK + `/${id}`);
    }


}

export default new VehicleTypesService()