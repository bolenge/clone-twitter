export default {
  async signUp(req, res) {
    res.send({
      data: "You hit the signup endpoint"
    })
  },

  async signIn(req, res) {
    res.send({
      data: "You hit the sign in endpoint"
    })
  },

  async logout(req, res) {
    res.send({
      data: "You hit the logout endpoint"
    })
  }
}