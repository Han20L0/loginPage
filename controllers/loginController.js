/** @format */

const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptHelper");
const { generateToken, decodeToken } = require("../helpers/jwtHelper");

class loginController {
	// Method login
	static async login(req, res, next) {
		try {
			const { username, password } = req.body;

			// Validasi input
			if (!username) {
				return next({
					name: "EmptyUsername",
					message: "Username is required",
				});
			} else if (!password) {
				return next({
					name: "EmptyPassword",
					message: "Password is required",
				});
			}

			// Cari user berdasarkan username
			const user = await User.findOne({ where: { username } });

			// Validasi user dan password
			if (!user || !(await comparePassword(password, user.password))) {
				return next({
					name: "InvalidUser",
					message: "Invalid username or password",
				});
			}

			// Generate access token
			const accessToken = generateToken({
				id: user.id,
				username: user.username,
			});

			// Decode token untuk keperluan debugging (opsional)
			const decodedToken = decodeToken(accessToken);
			console.log("Generated Token Payload:", decodedToken);

			// Kirim respons login sukses
			res.status(200).json({
				message: "Login successful",
				token: accessToken,
				user: {
					id: user.id,
					username: user.username,
				},
				decodedToken, // Kembalikan payload yang didecode untuk debugging (bisa dihapus)
			});
		} catch (error) {
			next(error);
		}
	}

	// Method register
	static async register(req, res, next) {
		try {
			const { username, password, role = "user" } = req.body;

			// Validasi input
			if (!username) {
				return next({
					name: "EmptyUsername",
					message: "Username is required",
				});
			} else if (!password) {
				return next({
					name: "EmptyPassword",
					message: "Password is required",
				});
			}

			// Cek apakah username sudah ada
			const existingUser = await User.findOne({ where: { username } });
			if (existingUser) {
				return next({
					name: "SequelizeUniqueConstraintError",
					errors: [{ message: "Username already exists" }],
				});
			}

			// Buat user baru
			const newUser = await User.create({
				username,
				password,
				role,
			});

			// Kirim respons sukses registrasi
			res.status(201).json({
				message: "Registration successful",
				username: newUser.username,
				role: newUser.role,
			});
		} catch (error) {
			next(error);
		}
	}

	// Method getAllUsers - Melihat semua user
	static async getAllUsers(req, res, next) {
		try {
			// Ambil semua user dari database
			const users = await User.findAll({
				attributes: ["id", "username", "role"], // Ambil kolom id, username, dan role
			});

			// Jika tidak ada user ditemukan
			if (!users || users.length === 0) {
				return next({
					name: "NotFoundError",
					message: "No users found",
				});
			}

			// Kirim respons semua user
			res.status(200).json({
				message: "Users retrieved successfully",
				users,
			});
		} catch (error) {
			next(error);
		}
	}
	// Method getUserByToken - Mencari user berdasarkan access token
	static async getUserByToken(req, res, next) {
		try {
			// User ID sudah ter-decode dari token dan tersedia di req.user
			const userId = req.user.id;

			// Cari user berdasarkan ID yang ada di req.user
			const user = await User.findByPk(userId, {
				attributes: ["id", "username", "role"], // Hanya mengambil field yang dibutuhkan
			});

			// Jika user tidak ditemukan, kirimkan error
			if (!user) {
				return next({
					name: "NotFoundError",
					message: "User not found",
				});
			}

			// Kirim respons dengan data user yang ditemukan
			res.status(200).json({
				id: user.id,
				username: user.username,
				role: user.role,
				message: "User profile fetched successfully",
			});
		} catch (error) {
			next(error); // Tangani error lain yang mungkin terjadi
		}
	}

	// Method getAllUsers - Melihat semua user dengan pagination, sorting, dan filtering
	static async PagFilSort(req, res, next) {
		try {
			// Ambil query parameter limit, page, sortBy, sortOrder, dan filter dari request
			let { page, limit, sortBy, sortOrder, username, role } = req.query;

			// Default nilai jika limit atau page tidak diberikan
			limit = limit ? parseInt(limit) : 10;
			const offset = page ? (parseInt(page) - 1) * limit : 0;

			// Tentukan default sorting
			sortBy = sortBy || "id"; // Kolom yang digunakan untuk sorting
			sortOrder = sortOrder || "ASC"; // Urutan ASC atau DESC

			// Membuat kondisi filtering
			let whereCondition = {};
			if (username) {
				whereCondition.username = { [Op.iLike]: `%${username}%` }; // Filter by username (case-insensitive)
			}
			if (role) {
				whereCondition.role = role; // Filter by role
			}

			// Ambil semua user dari database dengan limit, offset, sorting, dan filtering
			const { count, rows: users } = await User.findAndCountAll({
				attributes: ["id", "username", "role"], // Ambil kolom id, username, dan role
				where: whereCondition, // Apply filtering
				limit,
				offset,
				order: [[sortBy, sortOrder.toUpperCase()]], // Apply sorting
			});

			// Jika tidak ada user ditemukan
			if (!users || users.length === 0) {
				return next({
					name: "NotFoundError",
					message: "No users found",
				});
			}

			// Kirim respons semua user dengan pagination, sorting, dan filtering
			res.status(200).json({
				message: "Users retrieved successfully",
				totalItems: count,
				totalPages: Math.ceil(count / limit),
				currentPage: page ? parseInt(page) : 1,
				users,
			});
		} catch (error) {
			next(error);
		}
	}
}

module.exports = loginController;
