module.exports = {
  'login e2e tests': browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL + 'login')
      .waitForElementVisible('#app', 10000)
      .assert.containsText('h1', 'TaskAgile')
      .end()
  }
}
