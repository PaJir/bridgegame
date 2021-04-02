import axios from "axios";
import cookie from "react-cookies";
const API_URL = "http://101.132.252.93/api/";

var token = cookie.load("token") || "";

export default class Service {
    async enterRoom() {
        // console.log(token);
        // console.log(cookie.load("token"));
        axios
            .get(API_URL, {
                params: {
                    api: "enterRoom",
                    token: token
                }
            })
            .then((response) => {
                console.log(response.data);
                token = response.data.token;
                cookie.save("token", token);
            });
    }

    async start() {
        // console.log(token);
        if (!token) {
            return false;
        }
        return axios.get(API_URL, {
            params: {
                api: "start",
                token: token
            }
        });
    }

    async heart() {
        if (!token) {
            return false;
        }
        return axios
            .get(API_URL, {
                params: {
                    api: "heart",
                    token: token
                }
            })
            .then((response) => response.data);
    }
}
