var ip = "http://192.168.1.3:8000";

class data {
    api = () => {
        return ip;
    }
    image = () => {
        return ip + "/src";
    }
    user = () => {
        return ip + "/src/users";
    }
}

export default data;