import axios from 'axios'

const ADMIN_LINK = `http://localhost:8080/admins`;

class AdminService{

     getAllAdmins(){
    return axios.get(ADMIN_LINK);
    }

    deleteAdmin(admin){
        return axios.delete(ADMIN_LINK, admin);
    }

    insertAdmin(admin){
        return axios.post(ADMIN_LINK, admin);
    }

       updateAdmin(admin){
        return axios.put(ADMIN_LINK, admin);
    }

    adminLogin(email, password){
        console.log(password);
        return axios.get(`http://localhost:8080/admins/login/${email}-${password}`);
    }


    getAdminById(id){
        return axios.get(ADMIN_LINK + `/${id}`);
    }

}

export default new AdminService()