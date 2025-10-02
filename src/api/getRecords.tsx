import axios from "axios";
import { API_URL } from "../constants";

export default function getRecords() {
    const url = API_URL + '/records'
    return axios.get(url);
}