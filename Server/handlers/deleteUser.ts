import User from "../models/user";

const deleteUser = async (id: string) => {
    const prueba = await User.findById(id);
    console.log(prueba);

    const user = await User.findByIdAndRemove(id)
    if (!user) {
        return
    }

    return user;
}

export default deleteUser
