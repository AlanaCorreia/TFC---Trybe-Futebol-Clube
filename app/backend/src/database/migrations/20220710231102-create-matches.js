module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        field: 'home_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        field: 'away_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        nUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        }
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      inProgress: {
        field: 'in_progress',
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};
