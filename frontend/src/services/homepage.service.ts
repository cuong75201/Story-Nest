import { api } from "@/libs/api"
import type { Homepage } from "@/response/homepage.response";

export const getHomePageSlot = async() =>{
    const response = await api.get<Homepage>("/home-slot");
    return response;
}
