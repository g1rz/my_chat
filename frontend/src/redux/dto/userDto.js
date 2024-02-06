export const userDto = (userResponse) => ({
    email: userResponse.user.email,
    userId: userResponse.user.id,
    token: userResponse.accessToken,
    isActivated: userResponse.user.isActivated,
})