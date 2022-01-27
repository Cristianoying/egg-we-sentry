module.exports = agent => {
  console.log(12312312312);
  agent.logger.error(new Error('this is a agent error'));
};