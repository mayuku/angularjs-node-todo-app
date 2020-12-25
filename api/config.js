var username = process.env.DB_USERNAME || "mayuku";
var password = process.env.DB_PASSWORD || "lZhSMIfhN2RV1hce";
var dbname = process.env.DB_NAME || "todos";

module.exports = {
  getConnectionString: function () {
    return `mongodb+srv://${username}:${password}@cluster0.2chck.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  },
};
