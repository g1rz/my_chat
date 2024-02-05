import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import {
	Box,
	Grid,
	Typography,
	IconButton,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	Skeleton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { setCurrentChannelId } from '@/slices/chatSlice';

const Channels = () => {
	const channels = useSelector((state) => state.chat.channels);
	const currentChannelId = useSelector(
		(state) => state.chat.currentChannelId
	);
	const dispatch = useDispatch();

	return (
		<Box sx={{ boxShadow: 1, height: '100%' }}>
			<Grid
				container
				sx={{
					textAlign: 'center',
					padding: '20px',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography variant="h3">Каналы</Typography>
				<IconButton>
					<AddIcon />
				</IconButton>
			</Grid>
			<Box sx={{ padding: '10px' }}>
				<List>
					{channels.length
						? channels.map((channel) => (
								<ListItem key={channel.id} disablePadding>
									<ListItemButton
										component="button"
										selected={
											channel.id === currentChannelId
										}
										onClick={() =>
											dispatch(
												setCurrentChannelId(channel.id)
											)
										}
									>
										<ListItemText primary={channel.name} />
									</ListItemButton>
								</ListItem>
						  ))
						: [...Array(2)].map((_, index) => (
								<ListItem
									disablePadding
									sx={{ marginBottom: '10px' }}
									key={index}
								>
									<Skeleton
										width={'100%'}
										height={48}
										sx={{ transform: 'scale(1)' }}
									/>
								</ListItem>
						  ))}
				</List>
			</Box>
		</Box>
	);
};

export default Channels;
