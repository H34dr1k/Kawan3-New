var ip = "http://cleiment.000webhostapp.com"

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