import axios from "axios";
import { API_URL } from "../constants";

export default function AnswerQuery(query: {query: string}) {
    const url = API_URL + '/answer-query'
    return axios.post(url, query)
}