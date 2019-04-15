module.exports = function(sequelize, DataTypes) {
  var Complete = sequelize.define("Complete", {
    petName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Complete;
};
