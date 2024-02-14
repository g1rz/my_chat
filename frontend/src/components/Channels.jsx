import React, {useState} from 'react';

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
	Skeleton, Modal,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { setCurrentChannelId } from '@/redux/slices/chatSlice';

const Channels = () => {
	const [isShowModal, setIsShowModal] = useState(false);

	const channels = useSelector((state) => state.chat.channels);
	const currentChannelId = useSelector(
		(state) => state.chat.currentChannelId
	);
	const dispatch = useDispatch();

	const handleClose = () => {
		setIsShowModal(false);
	}

	const handleOpen = () => {
		setIsShowModal(true);
	}

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
				<IconButton onClick={handleOpen}>
					<AddIcon />
				</IconButton>
				<Modal
					open={isShowModal}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={{
						margin: '0 auto',
						maxWidth: '400px',
						background: '#fff',
					}}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Text in a modal
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
					</Box>
				</Modal>
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
