import axios from "axios";
import { USERS_URL } from "../API/index"

class AuthService {
//    async login(email: string, password: string) {
//         return axios
//             .post(USERS_URL + "login", {
//                 email,
//                 password
//             })
//             .then(response => {
//                 if (response.data.accessToken) {
//                     // localStorage.setItem("user", JSON.stringify(response.data));
//                     localStorage.setItem("token", JSON.stringify(response.data));
//                 }

//                 return response.data;
//             });
//     }

    logout() {
        localStorage.removeItem("token");
    }

    // register(fullName: string, email: string, password: string) {
    //     return axios.post(USERS_URL, {
    //         fullName,
    //         email,
    //         password
    //     });
    // }

    getCurrentUser() {
        const userStr = localStorage.getItem("token");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();