/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */

const sockets: Record<string, WebSocket> = {};

const socket = (id: string): WebSocket => {
	if (!sockets[id]) sockets[id] = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
	return sockets[id];
};

export default socket;
