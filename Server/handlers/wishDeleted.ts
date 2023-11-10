import user from "../models/user";

const wishDeleted = async (id: string, data: string) => {

  console.log(id);
  console.log(data);


  let infoUser = await user.findById(id)
  console.log(infoUser, "infouser");
  
  if(infoUser){
    infoUser.wishes = infoUser.wishes?.filter(el => el._id !== data);
    await infoUser.save();
  }
  return infoUser;
};

export default wishDeleted;
