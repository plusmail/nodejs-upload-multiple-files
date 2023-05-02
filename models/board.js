const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "게시물 ID"
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "게시물 제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "게시물 내용"
    },
    writer: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "게시물 작성자"
    },
    passwd: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    regdate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "제시물 작성일자"
    },
    img: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "제시물 이미지"
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
