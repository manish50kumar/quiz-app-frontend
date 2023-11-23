import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const {
    GET_USER_DETAIL_API,
} = endpoints;

export async function userDetails(token) {
    try {
        const response = await apiConnector("GET", GET_USER_DETAIL_API, null, {
        Authorization: `Bearer ${token}`,
      });
         console.log("GET USER RESPONSE : ", response);
        if (response.data.status !== "success") {
            throw new Error(response.data.message);
        }
        return response.data.data;
    }
    catch (error) {
        console.log("ERROR IN USER DETAILS : ", error.response);
        toast(error.response.data.message);
    }
}