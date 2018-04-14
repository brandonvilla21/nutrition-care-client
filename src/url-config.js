const HOST = 'http://localhost';
const PORT = '8000';
const token = "Bearer " + localStorage.getItem('access_token');

const urlConfig = {
    baseUrl: `${HOST}:${PORT}/api`,
    imageDir: `${HOST}:${PORT}/uploads/exercises`,
    axiosConfig: {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
          'Accept': 'application/json'
      }
    }
};
export default urlConfig;