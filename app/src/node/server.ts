/**
 * Copyright (C) Logos - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Tiago Souza tiagohaasouza@gmail.com
 * If you purchased this software, see the license.txt file contained in this source code for more information and possible exceptions.
 */
import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket, RawData } from 'ws';

class ImageCommand {
	static convertDirectoryToFormats(directoryPath: string, outputDir: string): void {
		// Implementação futura da conversão de imagens
		console.log(`Convertendo imagens de ${directoryPath} para ${outputDir}`);
	}
}

const app = express();
const port = 3000;

app.use(express.json());

const server = app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
	console.log('Cliente WebSocket conectado');

	ws.send('Conexão WebSocket estabelecida!');

	ws.on('message', (message: RawData) => {
		console.log('Mensagem recebida do cliente:', message);
	});

	ws.on('close', () => {
		console.log('Conexão WebSocket encerrada');
	});
});
/*
app.post('/convert-images', async (req, res) => {
	try {
		const { directoryPath, outputDir } = req.body;

		// Executar o comando para converter as imagens
		ImageCommand.convertDirectoryToFormats(directoryPath, outputDir);
		res.status(200).send('Imagens convertidas com sucesso!');
	} catch (error) {
		res.status(500).send(`Erro ao converter imagens: ${error.message}`);
	}
});
*/
interface ConvertImagesRequest {
	directoryPath: string;
	outputDir: string;
}

app.post(
	'/convert-images',
	async (
		req: Request<Record<string, never>, string, ConvertImagesRequest>,
		res: Response<string>,
	): Promise<void> => {
		try {
			const { directoryPath, outputDir } = req.body;

			convertImagesWithFeedback(directoryPath, outputDir, wss);
			res.status(200).send('Processamento de imagens iniciado!');
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			res.status(500).send(`Erro ao converter imagens: ${message}`);
		}
	},
);

function convertImagesWithFeedback(
	directoryPath: string,
	outputDir: string,
	wss: WebSocketServer,
): void {
	const clients: WebSocket[] = [...wss.clients];

	// Simulando a conversão de imagens
	const sizes: Array<{ width: number; height: number }> = [
		{ width: 200, height: 120 },
		{ width: 500, height: 300 },
		{ width: 1000, height: 600 },
	];

	ImageCommand.convertDirectoryToFormats(directoryPath, outputDir);

	// Simular o progresso do processo de conversão (com algum delay)
	sizes.forEach((size, index) => {
		setTimeout(
			() => {
				const message = `Imagem convertida: ${size.width}x${size.height}`;
				console.log(message);

				// Enviar a mensagem para todos os clientes conectados via WebSocket
				clients.forEach((client: WebSocket) => {
					if (client.readyState === WebSocket.OPEN) {
						client.send(message);
					}
				});
			},
			(index + 1) * 2000,
		);
	});
}
