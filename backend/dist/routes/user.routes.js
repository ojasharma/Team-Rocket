"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth_middleware_1.authenticate, userController_1.getCurrentUser);
/**
 * @route   GET /api/users
 * @desc    Get users (can filter by role)
 * @access  Private - Admin, Founder, Investor
 */
router.get('/', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('FOUNDER', 'INVESTOR'), userController_1.getUsers);
exports.default = router;
