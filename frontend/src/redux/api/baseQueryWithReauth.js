import {baseQuery} from "@/redux/api/baseQuery.js";
import {setUser} from "@/redux/slices/userSlice.js";
import {userDto} from "@/redux/dto/userDto.js";
import {apiEndpoints} from "@/consts/apiEndpoints.js";

export const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {

        const userData = await baseQuery(apiEndpoints.refreshPath(), api, extraOptions);

        if (userData.data) {
            const userDataDto = userDto(userData.data);
            api.dispatch(setUser(userDataDto));
            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
        }


    }
    return result
}