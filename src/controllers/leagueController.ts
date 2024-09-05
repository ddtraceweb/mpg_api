import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { CreateLeagueDto } from '../dtos/leagueDto.js';
import { LeagueService } from '../services/leagueService.js';
import logger from '../utils/logger.js';

const leagueService = new LeagueService();

/**
 * @swagger
 * /leagues/{leagueId}/users:
 *   get:
 *     summary: Retrieve users by league ID
 *     tags: [Leagues]
 *     parameters:
 *       - in: path
 *         name: leagueId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the league
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Name of the user
 *       400:
 *         description: League ID is missing or invalid
 *       500:
 *         description: Error retrieving users by league
 */
export const getUsersByLeague = async (req: Request, res: Response) => {
  try {
    const { leagueId } = req.params;

    if (!leagueId) {
      logger.error('League ID is missing from the request parameters');
      return res.status(400).json({ error: 'League ID is required' });
    }

    const result = await leagueService.getUsersByLeague(leagueId);

    logger.info(`Users retrieved successfully for league with id: ${leagueId}`);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error retrieving users by league:', {
        error: error.message,
      });
      res
        .status(500)
        .json({ error: error.message || 'Error retrieving users by league' });
    } else {
      logger.error('An unknown error occurred:', { error });
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

/**
 * @swagger
 * /leagues:
 *   post:
 *     summary: Create a new league
 *     tags: [Leagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique identifier for the league
 *                 example: "league_123"
 *               name:
 *                 type: string
 *                 description: Name of the league
 *                 example: "La Ligue 1"
 *               description:
 *                 type: string
 *                 description: Description of the league
 *                 example: "This is a description of the league."
 *               adminId:
 *                 type: string
 *                 description: ID of the league admin
 *                 example: "user_1"
 *     responses:
 *       201:
 *         description: League created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Error creating league
 */
export const createLeague = async (req: Request, res: Response) => {
  try {
    req.body.type = 'mpg_league';
    const createLeagueDto = plainToInstance(CreateLeagueDto, req.body);

    const errors = await validate(createLeagueDto);
    if (errors.length > 0) {
      logger.error('Validation failed for createLeague:', { errors });
      return res
        .status(400)
        .send(
          'Validation failed: ' +
            errors
              .map(e => Object.values(e.constraints || {}).join(', '))
              .join('; ')
        );
    }

    await leagueService.createLeague(req.body);

    res.status(201).send('League created');
  } catch (error) {
    logger.error('Error creating league:', error);
    res.status(500).send('Error creating league');
  }
};
