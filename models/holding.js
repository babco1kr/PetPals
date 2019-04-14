module.exports = function(sequelize, DataTypes) {
  //created table using sequelize
  var Holding = sequelize.define("Holding", {
    petName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    petType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pictureLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requestsId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    requestName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return Holding;
};
