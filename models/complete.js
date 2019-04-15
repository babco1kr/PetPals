module.exports = function(sequelize, DataTypes) {
  var Complete = sequelize.define("Complete", {
    petName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OwnerPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OwnerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SitterNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    SitterId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return Complete;
};
