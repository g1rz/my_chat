import channelModel from "../models/channel-model.js";
import userModel from "../models/user-model.js";
import ApiError from "../exceptions/ApiError.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import UserDto from "../dtos/user-dto.js";
import tokenService from "./token-service.js";


class ChannelService {

	async getAllChannels() {
		const channels = await channelModel.find();
		return channels;
	}

	async addChannel() {
		const candidate = await channelModel.findOne({title});
		if (candidate) {
			throw ApiError.BadRequest(`Канал с названием ${title} уже существует`);
		}

		const channel = await channelModel.create({title});

		return {
			...channel
		}
	}
}

export default new ChannelService();