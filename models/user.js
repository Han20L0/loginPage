/** @format */

"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcryptHelper");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Username cannot be empty",
						args: true,
					},
					notNull: {
						msg: "Username cannot be null",
						args: true,
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Password cannot be empty",
						args: true,
					},
					notNull: {
						msg: "Password cannot be null",
						args: true,
					},
					len: {
						args: [8, 20],
						msg: "Password must be between 8 and 20 characters long",
					},
					isUppercase(value) {
						if (!/[A-Z]/.test(value)) {
							throw new Error(
								"Password must contain at least one uppercase letter"
							);
						}
					},
					noSpaces(value) {
						if (/\s/.test(value)) {
							throw new Error("Password cannot contain spaces");
						}
					},
				},
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: {
						args: [["admin", "user"]],
						msg: "Role must be either 'admin' or 'user'",
					},
					notNull: {
						msg: "Role cannot be null",
						args: true,
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
			hooks: {
				beforeCreate: async (user) => {
					user.password = await hashPassword(user.password);
				},
			},
		}
	);
	return User;
};
