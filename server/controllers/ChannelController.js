
import channelService from "../service/channel-service.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/ApiError.js";
import userService from "../service/user-service.js";
class ChannelController {
	async channels(req, res, next) {
		try {
			const channels = await channelService.getAllChannels();
			return res.json(channels);
		} catch (err) {
			next(err);
		}
	}

	async addChannel(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				next(ApiError.BadRequest('Ошибка валидации', errors.array()));
			}
			const {title} = req.body;
			const channelData = await channelService.addChannel(title);

			return res.json(channelData);
		} catch (err) {
			next(err);
		}
	}
}

export default new ChannelController();