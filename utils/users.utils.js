const formatUserForDB = (userObj) => {
  const newUser = {
    firstname: userObj.firstname,
    lastname: userObj.lastname,
    email: userObj.email,
    password: userObj.password,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return newUser;
};

export { formatUserForDB };