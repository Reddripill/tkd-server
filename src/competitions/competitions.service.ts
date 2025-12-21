import { Injectable } from '@nestjs/common';
import { CreateCompetitionDto } from './dto/create-competition.dto';
import { UpdateCompetitionDto } from './dto/update-competition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './entities/competition.entity';
import { Repository } from 'typeorm';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Tournament } from 'src/tournaments/entities/tournament.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Arena } from 'src/arenas/entities/arenas.entity';
import { CompetitionCategory } from 'src/competition_categories/entities/competition_category.entity';

@Injectable()
export class CompetitionsService {
  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,

    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,

    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(CompetitionCategory)
    private ccRepository: Repository<CompetitionCategory>,

    @InjectRepository(Arena)
    private arenaRepository: Repository<Arena>,
  ) {}

  async create(createCompetitionDto: CreateCompetitionDto) {
    const allCompetitions: Competition[] = [];
    const { tournamentTitle, arenas } = createCompetitionDto;

    let tournament = await this.tournamentRepository.findOne({
      where: {
        title: tournamentTitle,
      },
    });

    if (!tournament) {
      tournament = await this.tournamentRepository.save(
        this.tournamentRepository.create({ title: tournamentTitle }),
      );
    }

    for (const arenaItem of arenas) {
      const { arenaTitle, info } = arenaItem;
      let arena = await this.arenaRepository.findOne({
        where: {
          title: arenaTitle,
        },
      });

      if (!arena) {
        arena = await this.arenaRepository.save(
          this.arenaRepository.create({ title: arenaTitle }),
        );
      }

      if (info && info.length > 0) {
        for (const infoItem of info) {
          const allCategories: Category[] = [];
          const { discipline: disciplineTitle, categories } = infoItem;
          let discipline = await this.disciplineRepository.findOne({
            where: {
              title: disciplineTitle,
            },
          });

          if (!discipline) {
            discipline = await this.disciplineRepository.save(
              this.disciplineRepository.create({ title: disciplineTitle }),
            );
          }

          if (categories && categories.length > 0) {
            for (const categoryItem of categories) {
              let category = await this.categoryRepository.findOne({
                where: {
                  title: categoryItem,
                },
              });

              if (!category) {
                category = await this.categoryRepository.save(
                  this.categoryRepository.create({ title: categoryItem }),
                );
              }
              allCategories.push(category);
            }
          }
          const competition = await this.competitionRepository.save(
            this.competitionRepository.create({
              tournament,
              arena,
              discipline,
            }),
          );
          for (const category of allCategories) {
            const existing = await this.ccRepository.findOne({
              where: { category, competition },
            });
            if (!existing) {
              await this.ccRepository.save(
                this.ccRepository.create({ category, competition }),
              );
            }
          }
          allCompetitions.push(competition);
        }
      }
    }
    return allCompetitions;
  }

  findAll() {
    return this.competitionRepository.find();
  }

  findOne(id: string) {
    return this.competitionRepository.find({
      where: {
        id,
      },
    });
  }

  update(id: string, updateCompetitionDto: UpdateCompetitionDto) {
    //  return this.competitionRepository.update(id, updateCompetitionDto);
  }

  remove(id: string) {
    return this.competitionRepository.delete({ id });
  }
}
