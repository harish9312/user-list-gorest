import Axios from 'axios';
import { UserModel } from 'app/models/UserModel';

export async function getAllUsers() {
    try {
        const { data: { result }} = await Axios.get('https://gorest.co.in/public-api/users?_format=json&access-token=xy9cE95RGe65zNAoHWZG6kgfi8vBrZr0Nnai',)
        UserModel.deleteAll()
        result.forEach(userInstance => {
           new UserModel(userInstance).$save(); 
        });
        return result
    } catch (error) {
        throw error;
    }
}

export async function submitUserForm(userData) {
    const { firstName,lastName, email, gender } = userData;
    try {
        const { data: { result }} = await Axios.post('https://gorest.co.in/public-api/users', {first_name: firstName,last_name: lastName, email, gender }, {
            headers:{Authorization: 'Bearer xy9cE95RGe65zNAoHWZG6kgfi8vBrZr0Nnai'}
        } )
        await getAllUsers();
        return result;
    } catch (error) {
        throw error;
    }
}