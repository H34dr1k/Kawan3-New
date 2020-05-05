var ip = "http://192.168.1.5:8000";

class data {
    api = () => {
        return ip;
    }
    image = () => {
        return ip + "/src";
    }
    user = () => {
        return ip + "/users";
    }
}

export default data;