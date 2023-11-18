import axios from 'axios';
import { accessToken, baseUrl} from '../components/Helper/index'

export const fetchPermissions = async (slug) => {
  console.log('gggggggggggggggg')
    try {

      const response = await axios.get(`${baseUrl}/org-role-permissions/member?org=${slug}`, {
        headers: {
          Authorization: 'Bearer ' + accessToken(),
        },
      });

      
      return response.data;
    } catch (error) {
      console.error('Error fetching organization permissions:', error);
      return null;
    }

};