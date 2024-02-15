import React from 'react';

import { Box, Card, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Messages = () => {
	const messages = useSelector((state) => state.chat.messages);
	const channels = useSelector((state) => state.chat.channels);
	const currentChannelId = useSelector(
		(state) => state.chat.currentChannelId
	);

	const currentChannel = channels.filter(
		(item) => item.id === currentChannelId
	)[0];

	return (
		<Grid container sx={{ flexDirection: 'column', height: '100%' }}>
			<Card sx={{ padding: '20px' }}>
				<Typography variant="h4">#{currentChannel.name}</Typography>
				<Typography>{messages.length} сообщений</Typography>
			</Card>

			<Grid item></Grid>
		</Grid>
	);
};

export default Messages;
