module.exports = agent => {
  agent.logger.error(new Error('this is a agent error'));
};