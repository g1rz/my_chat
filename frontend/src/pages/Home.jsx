import React from 'react';
import { Card, Grid } from '@mui/material';

import { Layout } from '@/components/Layout/Layout';
import Channels from '@/components/Channels';
import Messages from '@/components/Messages';

import AuthContext from '@/contexts/AuthContext';

import {
	setChannels,
	setMessages,
	setCurrentChannelId,
} from '@/redux/slices/chatSlice.js';

import {useAuth} from "@/hooks/useAuth.js";

const Home = () => {;


	return (
		<Layout>
			<Card sx={{ marginTop: '50px', minHeight: '80%', height: '1px' }}>
				<Grid container sx={{ height: '100%' }}>
					<Grid item xs={3}>
						<Channels />
					</Grid>
					<Grid item xs={9}>
						{/* <Messages /> */}
					</Grid>
				</Grid>
			</Card>
		</Layout>
	);
};

export default Home;
