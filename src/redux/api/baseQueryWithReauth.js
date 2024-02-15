import {baseQuery} from "@/redux/api/baseQuery.js";
import {removeUser, setUser} from "@/redux/slices/userSlice.js";
import {userDto} from "@/redux/dto/userDto.js";
import {apiEndpoints} from "@/consts/apiEndpoints.js";
import {Mutex} from "async-mutex";

const mutex = new Mutex();
export const baseQueryWithReauth = async (args, api, extraOptions) => {

    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const userData = await baseQuery(apiEndpoints.refreshPath(), api, extraOptions);

                if (userData.data) {
                    const userDataDto = userDto(userData.data);
                    api.dispatch(setUser(userDataDto));
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(removeUser())
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result
}