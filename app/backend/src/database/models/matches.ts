import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './team';

class Matches extends Model {
  public id!: number;
  public teamName!: string;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'awayTeam', as: 'awayTeam' });

Team.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Team.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Matches;
