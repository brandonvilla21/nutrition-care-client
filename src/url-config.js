const HOST = 'http://localhost';
const PORT = '8000';

const urlConfig = {
    baseUrl: `${HOST}:${PORT}/api`,
    axiosConfig: {
        headers: {'Content-Type': 'application/json'}
    }
};
export default urlConfig;