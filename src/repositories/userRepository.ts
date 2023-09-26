const login = async ({ email, password }) => {
  console.log(`Logged in ${email}`)
}

const register = async ({ name, email, password, address }) => {
  console.log(name)
}

export default {
  login,
  register
}
