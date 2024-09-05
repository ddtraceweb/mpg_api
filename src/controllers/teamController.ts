import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { UpdateTeamNameDto } from '../dtos/teamDto.js';
import { TeamService } from '../services/teamService.js';
import logger from '../utils/logger.js';

const teamService = new TeamService();

/**
 * @swagger
 * /teams/{teamId}:
 *   patch:
 *     summary: Update the name of a team
 *     tags: [Teams]
 *     parameters:
 *       - in: path
 *         name: teamId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the team to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the team
 *                 example: "New Team Name"
 *     responses:
 *       200:
 *         description: Team updated successfully
 *       400:
 *         description: Validation error - missing or invalid data
 *       500:
 *         description: Server error
 */
export const updateTeamName = async (req: Request, res: Response) => {
  try {
    const { teamId } = req.params;

    if (!teamId) {
      logger.error('Team ID is missing from the request parameters');
      return res.status(400).json({ error: 'Team ID is required' });
    }

    logger.info('Request body:', { body: req.body.name });

    const updateTeamNameDto = plainToInstance(UpdateTeamNameDto, req.body);

    const errors = await validate(updateTeamNameDto);
    if (errors.length > 0) {
      logger.error('Validation failed for updateTeamName:', { errors });
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
          .map(e => Object.values(e.constraints || {}).join(', '))
          .join('; '),
      });
    }

    await teamService.updateTeamName(teamId, updateTeamNameDto.name);

    logger.info(
      `Team with id ${teamId} updated successfully to name: ${updateTeamNameDto.name}`
    );
    res.status(200).send('Team updated');
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Error updating team name:', { error: error.message });
      res
        .status(500)
        .json({ error: error.message || 'Error updating team name' });
    } else {
      logger.error('An unknown error occurred while updating the team:', {
        error,
      });
      res
        .status(500)
        .json({ error: 'An unknown error occurred while updating the team' });
    }
  }
};
