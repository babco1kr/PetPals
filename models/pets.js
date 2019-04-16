module.exports = function(sequelize, DataTypes) {
  //created table using sequelize
  var Pet = sequelize.define("Pet", {
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
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // Assigns pet to the user creating it
  Pet.associate = function(models) {
    Pet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Pet;
};
