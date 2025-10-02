import axios from "axios";
import { API_URL } from "../constants";

export default function delRecord(_id: number) {
    const url = API_URL + '/delete-record' + `?id=${_id}`
    return axios.delete(url)
}